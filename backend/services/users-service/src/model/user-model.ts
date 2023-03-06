require('dotenv').config();
import mongoose from 'mongoose';

interface IUserSchemaDocument {
    username: string;
    email: string;
    password: string;
    role: string;
    country: string;
    isActive: boolean;
    isVerified: boolean;
    isAccountLocked: boolean;
    points: number;
    rides: any;

    fetchAuthToken: () => any;
    comparePasswords: (enteredPassword: string) => Promise<any>;
}

export const UserSchema = new mongoose.Schema<IUserSchemaDocument>({ // User Data Model

    username: { // username of the member of staff
        type: String,
        required: [true, "Please provide a valid username for the user"],
        min: [4, "Username must have at least 4 characters"],
        max: [12, "Username cannot exceed 12 characters"]
    },

    email: { // E-mail address of the user
        type: String,
        required: [true, "Please provide a valid e-mail address for the user"],
        unique: true
    },

    password: { // User password
        type: String,
        required: [true, "Please provide a valid password"],
        select: false
    },

    role: {
        type: String,
        default: 'staff',
        enum: ['manager', 'admin', 'staff']
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
    },

    rides: [{ // Used for later development of the application for the taxi-hauling feature for the e-commerce stores that handles delivery of products as a second option of delivery
        rideId: String,
        pickupLocation: String,
        dropoffLocation: String,
        rideType: String,
        rideStatus: String,
        driver_id: String,
        fare: Number,
        createdAt: Date,
        updatedAt: Date
    }]

}, {timestamps: true});


const User = mongoose.model("User", UserSchema);
export {User}