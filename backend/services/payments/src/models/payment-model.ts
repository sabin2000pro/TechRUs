import mongoose from 'mongoose';

export interface IPaymentSchemaDoc {

}

export const PaymentSchema = new mongoose.Schema({

}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
export {Payment}