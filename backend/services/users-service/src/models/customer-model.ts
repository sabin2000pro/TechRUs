import mongoose from 'mongoose';

export interface ICustomerModelDoc {
    forename: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export const CustomerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please specify the forename of the customer"]
    },

    email: {
        type: String,
        required: [true, "Please specify the forename of the customer"]
    },

    password: {
        type: String,
        required: [true, "Please specify the password of the customer"],
        select: false
    },

    role: {
        type: String,
        enum: ['admin', 'manager', 'customer'],
        default: 'customer'
    },

    startShift: {
       type: Date,
       default: Date.now,
       required: [true, "Please provide the start shift time for the customer"]
    },

    endShift: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide the end shift time for the customer"]
    },

    isActive: { // Is the customer's account active or not
        type: Boolean,
        default: false
    },

    isAccountLocked: {
        type: Boolean,
        default: false
    },

    isVerified: {
        type: Boolean,
        default: false
    }


}, {timestamps: true});

const Customer = mongoose.model("Customer", CustomerSchema);
export {Customer};