const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    "customerId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Please specify the Customer ID for this order"]
    },

    "paymentMethod": {
        type: String,
        required: [true, "Please specify the method used for this order"]
    }

}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;