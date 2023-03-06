import mongoose from 'mongoose';

export interface ICouponDocument {
    description: string;
    expiryDate: Date;
    minPurchaseAmount: Number;
}

export const CouponSchema = new mongoose.Schema<ICouponDocument>({

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

}, {timestamps: true});

const Coupon = mongoose.model("Coupon", CouponSchema);
export {Coupon}