const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({

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
module.exports = Coupon;