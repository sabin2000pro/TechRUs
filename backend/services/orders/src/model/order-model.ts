import mongoose from 'mongoose';

export interface IOrderDocument {
    orderItems: mongoose.Schema.Types.ObjectId;
    shippingInformation: Object
    orderStatus: String
    paymentInformation: Object
    itemPrice: Number;
    taxPrice: Number;
    totalPrice: Number;
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

        phoneNo: {
            type: String,
            required: [true, "Please specify the shipping phone number"]
        },

        postalCode: {
            type: String,
            required: [true, "Please specify the shipping postal code"]
        },

        country: { // Country of the shipping
            type: String,
            required: [true, "Please specify the shipping country"]
        }

    },

    orderStatus: { // The status the order is in. It can take 6 values as outlined below
        type: String,
        required: [true, "Please specify the status that the order is in"],
        enum: ['created', 'pending', 'shipped', 'processing', 'canceled', 'refunded'],
        default: 'processing'
    },

    paymentInformation: { // Payment object will hold the payment used for the payment, transaction ID, the status of the payment such as Pending, Failed or Canceled

        id: { // ID of the payment
            type: String
        },

        status: { // Status of the transaction
            type: String
        }

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
export {Order}