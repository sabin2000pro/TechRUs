import mongoose from 'mongoose';

export interface IProductSchema {
    category: mongoose.Schema.Types.ObjectId;
    coupon: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    image: string
    attributes: any;
    warranty: string;
    stockAvailable: number;
    price: number;
    currency: string;

    lowStockAlert: number;
    arrivingStockCount: number;
    reorderLevel: number;
}

const ProductSchema = new mongoose.Schema<IProductSchema>({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please specify the Category ID that this product belongs to"]
    },

    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        required: [true, "Please specify the Coupon ID that this product has"]
    },

    name: {
        type: String,
        required: [true, "Please specify the name of this product"]
    },

    description: {
       type: String,
       required: [true, "Please specify the description of this product"]
    },

    warranty: { // Warranty for this product
        type: String,
        default: '',
        required: [true, 'Please specify the warranty for this product']
    },

    image: {
        type: String,
        default: ''
    },

    attributes: [{ // Attributes of this product such  as Small, Medium, Large
        type: String,
        required: [true, "Please specify the attributes of this product"]
    }],

    price: {
        type: Number,
        required: [true, "Please specify the price of this product"],
        default: 0.0
    },

    currency: {
        type: String,
        required: [true, "Please specify the currency that this product accepts"],
        default: "GBP"
    },

    stockAvailable: {
        type: Number,
        default: 0,
        required: [true, "Please specify the stock available for this product"]
    },

    lowStockAlert: {
        type: Number,
        required: [true, "Please specify when a stock alert should be placed for this product"],
        default: 3
    },

    arrivingStockCount: { // Stores how much stock the inventory is expecting
        type: Number,
        default: 0
    },

    reorderLevel: {
        type: Number,
        default: 10
    }


}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
export {Product}