import mongoose from 'mongoose';

export interface IProductSchema {
    category: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    images: any;
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

    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please specify the Category ID that this product belongs to"]
    },

    name: {
        type: String,
        required: [true, "Please specify the name of this product"]
    },

    description: {
       type: String,
       required: true
    },

    warranty: {
        type: String,
        default: '',
        required: [true, 'Please specify the warranty for this product']
    },

    images: [{
        type: String,
        required: [true, "Please specify the images that belongs to this product"]
    }],

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
        required: [true, "Please specify the low stock alert for this product"],
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
module.exports = Product;