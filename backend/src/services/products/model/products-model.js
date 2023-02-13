const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please specify the Category ID that this product belongs to"]
    }

    
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;