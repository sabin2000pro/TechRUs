import mongoose from 'mongoose';

export interface IPaymentSchemaDoc {
    orderId: mongoose.Schema.Types.ObjectId,
    customerId: mongoose.Schema.Types.ObjectId,
    currency: String;
    paymentStatus: String;
}

export const PaymentSchema = new mongoose.Schema({

    orderId: {

    },

    customerId: {

    },

    currency: {

    },

    paymentStatus: {
        type: String
    }

}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
export {Payment}