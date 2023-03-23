"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipping = exports.ShippingSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Shipping Microservice Data Model 
exports.ShippingSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
<<<<<<< HEAD
        required: [true, "Please specify the user that belongs to this shipping details"]
=======
        required: [true, "Please provide the User ID when creating your shipping details"]
>>>>>>> 5cf8c4c86f03c03df536640384c52e14c20b2471
    },
    address: {
        type: String,
        required: [true, "Please provide the address for the shipping"]
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
