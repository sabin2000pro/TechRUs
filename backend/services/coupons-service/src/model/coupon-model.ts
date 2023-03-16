import mongoose from 'mongoose';

export interface ICouponDocument {
    product: mongoose.Schema.Types.ObjectId;
    description: string;
    expiryDate: Date;
    minPurchaseAmount: Number;
}

export const CouponSchema = new mongoose.Schema<ICouponDocument>({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    description: {
        type: String,
        required: [true, "Please specify the description of this coupon"],
        default: "10% off your next order"
    },

    code: {

    },

    isActive: {
      type: Boolean,
      default: false,
      required: [true, "Please specify if this coupon is active or not"]
    },

    expirationDate: {
        type: Date,
        required: [true, "Please specify when the coupon code expires"],
        default: Date.now
    }

}, {timestamps: true});

const Coupon = mongoose.model("Coupon", CouponSchema);
export {Coupon}