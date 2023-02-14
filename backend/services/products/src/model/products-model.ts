import mongoose from 'mongoose';

export interface IProductSchema {
    category: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    images: any;
    attributes: any;
    stockAvailable: number;
    price: number;
    currency: string;
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
        required: [true, "Please specify the currency that this product accepts"]
    },

    stockAvailable: {
       
    }


}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;