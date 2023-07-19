import Stripe from "stripe";
import getRawBody from "raw-body";
import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const getOrders = async (req, res) => {
    const resPerPage = 5;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find().sort({ createAt: -1 }), req.query).pagination(resPerPage);

    const orders = await apiFilters.query.find().populate("shippingInfo user");

    res.status(200).json({
        ordersCount,
        resPerPage,
        orders
    });
};

export const getOrder = async (req, res, next) => {
    const order = await Order.findById(req.query.id).populate("shippingInfo user");

    if (!order) {
        return next(new ErrorHandler('No Order found this ID', 404));
    }

    res.status(200).json({ order });
};

export const myOrders = async (req, res) => {
    const resPerPage = 2;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), req.query).pagination(resPerPage);

    const orders = await apiFilters.query.find({ user: req.user._id }).populate("shippingInfo user");

    res.status(200).json({
        ordersCount,
        resPerPage,
        orders
    });
};

export const checkoutSession = async (req, res) => {
    const body = req.body;

    const line_items = body?.items?.map((item) => {
        return {
            price_data: {
                currency: 'bgn',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    metadata: { productId: item.product }
                },
                unit_amount: item.price * 100
            },
            tax_rates: ['txr_1NIVXgIQ8Q2zJU03OjkhNvDX'],
            quantity: item.quantity
        };
    });

    const shippingInfo = body.shippingInfo;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${process.env.API_URL}/me/orders?order_success=true`,
        cancel_url: `${process.env.API_URL}`,
        customer_email: req?.user?.email,
        client_reference_id: req?.user?._id,
        mode: 'payment',
        metadata: { shippingInfo },
        shipping_options: [
            { shipping_rate: "shr_1NIUuzIQ8Q2zJU03V22UPwmO" },
            { shipping_rate: "shr_1NIV3EIQ8Q2zJU03LJ5xDAIu" },
        ],
        line_items
    });

    res.status(200).json({ url: session.url });
};

async function getCartItems(line_items) {
    return new Promise((resolve, reject) => {
        let cartItems = [];

        line_items?.data?.forEach(async (item) => {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            cartItems.push({
                product: productId,
                name: product.name,
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity,
                image: product.images[0]
            })

            if (cartItems.length === line_items?.data.length) {
                resolve(cartItems);
            }
        });
    });
}

export const webhook = async (req, res) => {
    try {
        const rawBody = await getRawBody(req);
        const signature = req.headers['stripe-signature'];

        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id);

            const orderItems = await getCartItems(line_items);
            const userId = session.client_reference_id;
            const amountPaid = session.amount_total / 100;

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status,
                amountPaid,
                taxPaid: session.total_details.amount_tax / 100
            };

            const orderData = {
                user: userId,
                shippingInfo: session.metadata.shippingInfo,
                paymentInfo,
                orderItems
            };

            const order = await Order.create(orderData);
            res.status(201).json({ success: true });
        }
    } catch (error) {
        console.log(error);
    }
};