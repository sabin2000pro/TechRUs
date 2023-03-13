import mongoose from 'mongoose';

export interface IShippingDocument {
    order: mongoose.Schema.Types.ObjectId;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    shippingStatus: string;
    phoneNo: string;
    createdAt: Date;
    updatedAt: Date
}

export const ShippingSchema = new mongoose.Schema({

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: [true, "Please specify the order ID that relates to this shipping information"]
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: [true, "Please specify the city for this shipping"]
    },

    country: {
        type: String,
        required: [true, "Please specify the country for this shipping"]
    },

    postalCode: {
        type: String,
        required: [true, "Please specify the postal code"]
    },

    phoneNo: {
        type: String,
        required: [true, "Please specify the phone number for this shipping"]
    },

    shippingStatus: {
        type: String,
        required: [true, "PLease specify the shipping status"],
        enum: ['shipped', 'delivered', 'canceled', 'processing'],
        default: 'processing'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
   
}, {timestamps: true})

const Shipping = mongoose.model("Shipping", ShippingSchema);
export {Shipping}