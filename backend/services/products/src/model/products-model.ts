import { model, Model } from 'mongoose';
import mongoose from 'mongoose';

interface ProductDocument extends Document {
    name: string;
    description: string;
    image: string
    warranty: string;
    stockCount: Number;
    price: number;
    currency: string;
    lowStockAlert: number;
    arrivingStockCount: number;
    reorderLevel: number;
    isNew: boolean
}

const ProductSchema = new mongoose.Schema<ProductDocument>({

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

    stockCount: {
        type: Number,
        default: 0,
        required: [true, "Please specify the stock available for this product"]
    },

    lowStockAlert: {
        type: Number,
        required: [true, "Please specify when a stock alert should be placed for this product"],
        default: 2
    },

    arrivingStockCount: { // Stores how much stock the inventory is expecting
        type: Number,
        default: 0
    },

    reorderLevel: {
        type: Number,
        default: 10
    },

    isNew: {
        type: Boolean,
        required: [true, 'Please specify if the product is new or not'],
        default: false
    }


}, {timestamps: true});


const Product: Model<ProductDocument> = mongoose.model("Product", ProductSchema);
export {Product, ProductDocument}