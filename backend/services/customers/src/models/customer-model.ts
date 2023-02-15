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

    forename: {
        type: String,
        required: [true, "Please specify the forename of the customer"]
    },

    surname: {
        type: String,
        required: [true, "Please specify the forename of the customer"]
    },

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
        required: [true, "Please specify the role of the customer"]
    }


}, {timestamps: true});

const Customer = mongoose.model("Customer", CustomerSchema);
export {Customer};