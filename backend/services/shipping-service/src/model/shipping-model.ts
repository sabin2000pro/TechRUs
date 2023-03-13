import mongoose from 'mongoose';

export interface IShippingDocument {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    shippingStatus: string;
    createdAt: Date;
    updatedAt: Date
}

export const ShippingSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: [true, "Please specify the city for the shipping"]
    },

    state: {
        type: String,
        required: [true, "Please specify the state"]
    },

    postalCode: {
        type: String,
        required: [true, "Please specify the postal code"]
    },

    shippingStatus: {
        type: String,
        required: [true, "PLease specify the shipping status"],
        enum: ['shipped', 'delivered', 'canceled']
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