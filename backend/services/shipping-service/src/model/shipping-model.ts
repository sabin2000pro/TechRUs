import mongoose from 'mongoose';

export interface IShippingDocument {
    user: mongoose.Schema.Types.ObjectId;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    shippingStatus: string;
    phoneNo: string;
    createdAt: Date;
    updatedAt: Date
}

// Shipping Microservice Data Model 
export const ShippingSchema = new mongoose.Schema<IShippingDocument>({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the User ID when creating your shipping details"]
    },

    address: { // User address
        type: String,
        required: [true, "Please provide the address for the shipping"]
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
export {Shipping} // Export the shipping data model as part of the shipping microservice