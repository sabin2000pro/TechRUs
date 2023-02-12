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

    items: [ // Payment items stores the products that have been ordered. Including the Product Id, name

        {
            productId: "",
            name: "",
            price: 0,
            countInStock: 0
        }

    ],

    shippingFee: { // Shipping Fee incurred by this order
        type: Number,
        required: [true, "Please specify what the shipping fee is for this order"]
    },

    currency: { // Currency used to pay for this order
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
    },

    orderStatus: {
        type: String,
        required: [true, "Please specify the status that the order is in"],
        enum: ['created', 'pending', 'shipped', 'processing', 'canceled', 'refunded']
    },

    payment: { // Payment object will hold the payment used for the payment, transaction ID, the status of the payment such as Pending, Failed or Canceled
        paymentMethod: String,
        transactionId: String,

        paymentStatus: {
            type: String,
            default: "pending",
            enum: ['pending', 'failed', 'canceled']
        },

        paymentAmount: Number,
        paymentCurrency: String
    },

    customerNotes: String

}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;