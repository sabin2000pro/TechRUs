"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = exports.CouponSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.CouponSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: [true, "Please specify the description of this coupon"],
        default: "10% off your next order"
    },
    expiryDate: {
        type: Date,
        required: [true, "Please specify when the coupon code expires"]
    },
    minPurchaseAmount: {
        type: Number,
        required: [true, "Please specify the minimum purchase amount"]
    }
}, { timestamps: true });
var Coupon = mongoose_1.default.model("Coupon", exports.CouponSchema);
exports.Coupon = Coupon;
