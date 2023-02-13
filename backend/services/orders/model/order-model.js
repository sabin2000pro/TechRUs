const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    customerId: { // Customer Id that the order has been placed by
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Please specify the Customer ID for this order"]
    },

    shippingFee: { // The Shipping Fee incurred by this order
        type: Number,
        required: [true, "Please specify what the shipping fee is for this order"],
        default: 0.0
    },

    currency: { // Currency used to pay for this order
        type: String,
        required: [true, "Please specify the currency used for this payment method"],
        default: "GBP"
    },

    totalPrice: { // Total price for this order
        type: Number,
        required: [true, "Please specify the total price for this order"],
        default: 0.00
    },

    orderDate: { // Date when the order was placed
        type: Date,
        default: Date.now
    },

    orderItems: [ // Payment items stores the products that have been ordered. Including the Product Id, name

    {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        price: Number,
        countInStock: Number
    }

 ],

    orderHistory: [{ // Order history is an array of objects that stores data for the status of the order, timestamp and any notes
        status: String, // Order History Attribute: Status of the order in the past
        orderReceivedAt: Date, // Order History: When the order was received by the customer
        notes: String // Order History: Any notes left by the customer when the order was placed
    }],

    orderStatus: { // The status the order is in. It can take 6 values as outlined below
        type: String,
        required: [true, "Please specify the status that the order is in"],
        enum: ['created', 'pending', 'shipped', 'processing', 'canceled', 'refunded']
    },

    payment: { // Payment object will hold the payment used for the payment, transaction ID, the status of the payment such as Pending, Failed or Canceled

        paymentMethod: String,
        transactionId: String,

        paymentStatus: { // Status that the payment is in
            type: String,
            default: "pending",
            enum: ['pending', 'failed', 'canceled']
        },

        paymentAmount: Number,
        paymentCurrency: String
    },

    shipping_address: { // Shipping Address object for the order
        streetAddress: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
    },

    customerNotes: String

}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;