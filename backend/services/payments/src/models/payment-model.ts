import mongoose from 'mongoose';

export interface IPaymentSchemaDoc {
    orderId: mongoose.Schema.Types.ObjectId,
    customerId: mongoose.Schema.Types.ObjectId,
    currency: String;
    paymentStatus: String;
}

export const PaymentSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Please specify the order ID when creating a new payment"]
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "Please specify the Customer ID when creating a new payment"]
    },

    currency: {
        type: String,
        default: "GBP"
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'canceled', 'refunded']
    }

}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
export {Payment}