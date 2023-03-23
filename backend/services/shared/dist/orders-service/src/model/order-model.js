"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please include the User ID that belongs to this order"]
    },
    orderItems: [{
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }],
    shippingInformation: {
        address: {
            type: String,
            required: [true, "Please specify the shipping address"]
        },
        city: {
            type: String,
            required: [true, "Please specify the shipping city"]
        },
        country: {
            type: String,
            required: [true, "Please specify the country for this order shipping"]
        },
        phoneNo: {
            type: String,
            required: [true, "Please specify the shipping phone number"]
        },
        postalCode: {
            type: String,
            required: [true, "Please specify the shipping postal code"]
        }
    },
    orderStatus: {
        type: String,
        enum: ['received', 'pending', 'completed', 'processing', 'canceled', 'refunded'],
        default: 'received' // By default, when an order is placed, it is received
    },
    itemPrice: {
        type: Number,
        required: [true, 'Please ensure the order has the price of the item being ordered'],
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: [true, "Please ensure that this order has the tax price of the item being ordered"],
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: [true, "Please ensure that this order has the shipping price of the item being ordered"],
        default: 0.00
    },
    totalPrice: {
        type: Number,
        required: [true, "Please ensure that this order contains the total price for the order"],
        default: 0.00
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
var Order = mongoose_1.default.model("Order", exports.OrderSchema);
exports.Order = Order;
