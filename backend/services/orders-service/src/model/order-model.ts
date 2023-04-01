import mongoose from 'mongoose';

export interface IOrderDocument {
    user: mongoose.Schema.Types.ObjectId;
    orderItems: mongoose.Schema.Types.ObjectId;
    shippingInformation: Object
    orderStatus: String
    itemPrice: Number;
    taxPrice: Number;
    totalPrice: number;
    createdAt: Date;
    shippingPrice: Number;
    paidAt: Date
}

export const OrderSchema = new mongoose.Schema<IOrderDocument>({

    orderItems: [{ // Array of all the order items being ordered
        
        name: { // Name of the product being ordered
            type: String,
            required: true
        },

        quantity: { // Quantity of the product being ordered
            type: Number,
            required: [true, "Please specify the product quantity"],
            default: 0
        },

        itemPrice: { // Items price being ordered
            type: Number,
            required: [true, 'Please ensure the order has the price of the item being ordered'],
            default: 0.0
        },
    
        taxPrice: { // The tax price incurred as part of the order
            type: Number,
            required: [true, "Please ensure that this order has the tax price of the item being ordered"],
            default: 0.0
        },
    
        shippingPrice: { // Shipping price of the order
            type: Number,
            required: [true, "Please ensure that this order has the shipping price of the item being ordered"],
            default: 0.00
        },
    
        totalPrice: { // Total price for the order
            type: Number,
            required: [true, "Please ensure that this order contains the total price for the order"],
            default: 0.00
        },

        product: { // Product ID that is being ordered
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        }

    }],

    shippingInformation: { // Shipping Information Object will be part of the order
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Please provide the ID that this shipping info belongs to"]
        },

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
        enum: ['received', 'pending', 'completed', 'processing', 'canceled', 'refunded'],
        default: 'received' // By default, when an order is placed, it is received
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    paidAt: { // Date at which the order has been paid at
        type: Date,
        default: Date.now
    }

}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
export {Order} // Export the order model