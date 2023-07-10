'use client';

import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomPagination from "../layouts/CustomPagination";
import OrderItem from "./OrderItem";
import CartContext from "@/context/CartContext";

const ListOrders = ({ orders }) => {
    const { clearCart } = useContext(CartContext);
    const params = useSearchParams();
    const router = useRouter();

    const orderSuccess = params.get("order_success");

    useEffect(() => {
        if (orderSuccess == "true") {
            clearCart();
            router.replace("/me/orders");
        }
    }, [])

    return (
        <>
            <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
            {orders?.orders?.map((order) => (
                <OrderItem key={order._id} order={order} />
            ))}

            {orders?.ordersCount > orders?.resPerPage && (
                <div className="mb-6">
                    <CustomPagination resPerPage={orders?.resPerPage} productsCount={orders?.ordersCount} />
                </div>
            )}
        </>
    );
};

export default ListOrders;