import mongoose from 'mongoose';

export interface ICouponDocument {
    product: mongoose.Schema.Types.ObjectId;
    description: string;
    code: string;
    isActive: boolean;
    expiryDate: Date;
    discountAmount: Number
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

}, {timestamps: true});

const Coupon = mongoose.model("Coupon", CouponSchema);
export {Coupon}