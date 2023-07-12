import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please anter product name']
    },
    description: {
        type: String,
        required: [true, 'Please anter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please anter product price']
    },
    images: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please anter product category'],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Sports",
                "Books",
            ],
            message: "Please select correct category"
        }
    },
    seller: {
        type: String,
        required: [true, 'Please anter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please anter product stock']
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);