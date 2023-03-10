"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipping = exports.ShippingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ShippingSchema = new mongoose_1.default.Schema({
    order: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Please specify the order ID that relates to this shipping information"]
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: [true, "Please specify the city for this shipping"]
    },
    country: {
        type: String,
        required: [true, "Please specify the country for this shipping"]
    },
    postalCode: {
        type: String,
        required: [true, "Please specify the postal code"]
    },
    phoneNo: {
        type: String,
        required: [true, "Please specify the phone number for this shipping"]
    },
    shippingStatus: {
        type: String,
        required: [true, "PLease specify the shipping status"],
        enum: ['shipped', 'delivered', 'canceled', 'processing'],
        default: 'processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const Shipping = mongoose_1.default.model("Shipping", exports.ShippingSchema);
exports.Shipping = Shipping;
