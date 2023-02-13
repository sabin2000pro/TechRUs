const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

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

    },

    images: [{
        type: String,
        required: [true, "Please specify the images that belongs to this product"]
    }],

    attributes: [{ // Attributes of this product such 
        
    }]


}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;