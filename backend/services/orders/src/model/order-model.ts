import mongoose from 'mongoose';

export interface IOrderDocument {
    orderItems: mongoose.Schema.Types.ObjectId;
    shippingInformation: Object
    orderStatus: String
    itemPrice: Number;
    taxPrice: Number;
    totalPrice: number;
    shippingPrice: Number;
    paidAt: Date
}

export const OrderSchema = new mongoose.Schema<IOrderDocument>({

    orderItems: [{ // Array of all the order items being ordered
        
        name: {
            type: String,
            required: true
        },

        quantity: { // Quantity of the product being ordered
            type: Number,
            required: true
        },

        price: { // Price of the product
            type: Number,
            required: true
        },

        product: { // Product itself part of the order items
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }

    }],

    shippingInformation: {

        address: {
            type: String,
            required: [true, "Please specify the shipping address"]
        },

        city: {
            type: String,
            required: [true, "Please specify the shipping city"]
        },

        country: {
            type: String,
            required: [true, "Please specify the country for this order shipping"]
        },

        phoneNo: {
            type: String,
            required: [true, "Please specify the shipping phone number"]
        },

        postalCode: {
            type: String,
            required: [true, "Please specify the shipping postal code"]
        }

    },

    orderStatus: { // The status the order is in. It can take 6 values as outlined below
        type: String,
        enum: ['received', 'pending', 'shipped', 'processing', 'canceled', 'refunded'],
        default: 'processing'
    },

    itemPrice: { // Items price being ordered
        type: Number,
        required: true,
        default: 0.0
    },

    taxPrice: { // The tax price incurred
        type: Number,
        required: true,
        default: 0.0
    },

    shippingPrice: { // Shipping price of the order
        type: Number,
        required: true,
        default: 0.00
    },

    totalPrice: { // Total price for the order
        type: Number,
        required: true,
        default: 0.00
    },

    paidAt: { // Date at which the order has been paid at
        type: Date,
        default: Date.now
    }

}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
export {Order} // Export the order model