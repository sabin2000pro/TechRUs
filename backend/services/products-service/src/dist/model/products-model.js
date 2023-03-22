"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please include the user ID that created this product"]
    },
    name: {
        type: String,
        required: [true, "Please specify the name of this product"]
    },
    description: {
        type: String,
        required: [true, "Please specify the description of this product"]
    },
    warranty: {
        type: String,
        default: '',
        required: [true, 'Please specify the warranty for this product']
    },
    image: {
        type: String,
        default: 'no-photo.png'
    },
    price: {
        type: Number,
        required: [true, "Please specify the price of this product"],
        default: 0.0
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
    isNew: {
        type: Boolean,
        required: [true, 'Please specify if the product is new or not'],
        default: false
    }
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.Product = Product;
