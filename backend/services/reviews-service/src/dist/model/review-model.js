"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide the product ID for this review"]
    },
    title: {
        type: String,
        required: [true, "Please give this rating a title"]
    },
    rating: {
        type: Number,
        required: [true, "Please specify a valid rating for this review"]
    },
    comment: {
        type: String,
        required: [true, "Please provide a valid comment for this review"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const Review = mongoose_1.default.model("Review", ReviewSchema);
exports.Review = Review;
