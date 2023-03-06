"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ProductSchema = new mongoose_1.default.Schema({
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
    arrivingStockCount: {
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
}, { timestamps: true });
var Product = mongoose_1.default.model("Product", ProductSchema);
exports.Product = Product;
