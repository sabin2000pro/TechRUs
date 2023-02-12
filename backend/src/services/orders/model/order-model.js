const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: [true, "The Order must have a valid order ID"]
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Please specify the Customer ID for this order"]
    },

    paymentMethod: {
        type: String,
        required: [true, "Please specify the method used for this order"]
    },

    shippingFee: {
        type: Number,
        required: [true, "Please specify what the shipping fee is for this order"]
    },

    currency: {
        type: String,
        required: [true, "Please specify the currency used for this payment method"],
        default: "GBP"
    },

    totalPrice: { // Total price for this order
        type: Number,
        required: [true, "Please specify the total price for this order"]
    },

    orderDate: {
        type: Date,
        required: true
    }

}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;