"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.PaymentSchema = new mongoose_1.default.Schema({
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Please specify the order ID when creating a new payment"]
    },
    amount: {
        type: Number,
        default: 0.0,
        required: [true, "Please specify the amount of the order"]
    },
    currency: {
        type: String,
        required: [true, "Please specify the currency used for the payment"],
        default: 'usd'
    },
    paymentMethod: {
        type: String,
        enum: ['stripe'],
        required: true
    },
    stripePaymentId: {
        type: String,
        required: true
    },
    stripeChargeId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['succeeded', 'failed', 'refunded'],
        required: true
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
var Payment = mongoose_1.default.model("Payment", exports.PaymentSchema);
exports.Payment = Payment;
