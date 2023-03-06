"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.OrderSchema = new mongoose_1.default.Schema({
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
        phoneNo: {
            type: String,
            required: [true, "Please specify the shipping phone number"]
        },
        postalCode: {
            type: String,
            required: [true, "Please specify the shipping postal code"]
        },
        country: {
            type: String,
            required: [true, "Please specify the shipping country"]
        }
    },
    orderStatus: {
        type: String,
        required: [true, "Please specify the status that the order is in"],
        enum: ['received', 'pending', 'shipped', 'processing', 'canceled', 'refunded'],
        default: 'processing'
    },
    paymentInformation: {
        id: {
            type: String
        },
        status: {
            type: String,
            default: "pending",
            enum: ['pending', 'received', 'canceled', 'refund']
        }
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.00
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.00
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
var Order = mongoose_1.default.model("Order", exports.OrderSchema);
exports.Order = Order;
