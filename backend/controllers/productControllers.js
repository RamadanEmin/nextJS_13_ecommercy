import Product from "../models/product";
import APIFilters from "../utils/APIFilters";

export const newProduct = async (req, res, next) => {
    req.body.user = req.user._id;

    const product = await Product.create(req.body);
    res.status(201).json({
        product,
    });
}

export const getProducts = async (req, res, next) => {
    const resPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFilters = new APIFilters(Product.find(), req.query).search().filter();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();
    res.status(200).json({
        productCount,
        resPerPage,
        filteredProductsCount,
        products,
    });
}

export const getProduct = async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        res.status(404).json({
            error: "Product not found."
        });
    }

    res.status(200).json({
        product,
    });
}

export const uploadProductImages = async (req, res, next) => {
    let product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    const uploader = async (path) => await uploads(path, "ecommerce/products");

    const urls = [];
    const files = req.files;

    for (let file of files) {
        const { path } = file;
        const imgUrl = await uploader(path);
        urls.push(imgUrl);
        fs.unlinkSync(path);
    }

    product = await Product.findByIdAndUpdate(req.query.id, {
        images: urls
    });

    res.status(200).json({
        data: urls,
        product
    });
};

export const updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    product = await Product.findByIdAndUpdate(req.query.id, req.body);

    res.status(200).json({
        product
    });
};

export const deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        const res = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.deleteOne();

    res.status(200).json({
        success: true
    });
};