import mongoose from 'mongoose';

export interface IPaymentSchemaDoc {
    orderId: mongoose.Schema.Types.ObjectId,
    currency: String;
    paymentStatus: String;
}

export const PaymentSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Please specify the order ID when creating a new payment"]
    },

    amount: {
        type: Number,
        default: 0.0,
        required: [true, "Please specify the amount of the order"]
    },

    currency: {
        type: String,
        required: [true, "Please specify the currency used for the payment"]
    },

    paymentMethod: {
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
        default: Date.now,
        required: true
      }

}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
export {Payment}