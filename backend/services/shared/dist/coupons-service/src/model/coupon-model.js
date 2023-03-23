"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = exports.CouponSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.CouponSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product"
    },
    description: {
        type: String,
        required: [true, "Please specify the description of this coupon"],
        default: "10% off your next order"
    },
    code: {
        type: String,
        required: [true, "Please specify the code of the coupon when creating it"]
    },
    isActive: {
        type: Boolean,
        default: false,
        required: [true, "Please specify if this coupon is active or not"]
    },
    expiryDate: {
        type: Date,
        required: [true, "Please specify when the coupon code expires"],
        default: Date.now
    },
    discountAmount: {
        type: Number,
        default: 0.00
    }
}, { timestamps: true });
var Coupon = mongoose_1.default.model("Coupon", exports.CouponSchema);
exports.Coupon = Coupon;
