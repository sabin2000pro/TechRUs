import mongoose from 'mongoose';

export interface IPaymentDocument extends Document {
    orderId: mongoose.Schema.Types.ObjectId,
    amount: number;
    currency: string;
    paymentMethod: string
    stripePaymentId: string;
    stripeChargeId: string;
    status: string
    createdAt: Date
}

export const PaymentSchema = new mongoose.Schema<IPaymentDocument>({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Please specify the order ID when creating a new payment"]
    },

    amount: { // Amount incurred from the payment
        type: Number,
        default: 0.0,
        required: [true, "Please specify the amount of the order"]
    },

    currency: { // Currency used for the payment
        type: String,
        required: [true, "Please specify the currency used for the payment"]
    },

    paymentMethod: { // The payment method used for the order
        type: String,
        enum: ['stripe'],
        required: true
      },

      stripePaymentId: { // The Stripe Payment ID generated from the payment
        type: String,
        required: true
      },

      stripeChargeId: { // Stripe Charge ID 
        type: String,
        required: true
      },

      status: {
        type: String,
        enum: ['succeeded', 'failed', 'refunded'],
        required: true
      },

      createdAt: {
        type: Date,
        default: Date.now
      },

      updatedAt: {

      }

}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
export {Payment}