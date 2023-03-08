require('dotenv').config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUserSchemaDocument {
    username: string;
    email: string;
    password: string;
    role: string;
    country: string;
    isActive: boolean;
    isVerified: boolean;
    isAccountLocked: boolean;
    storePoints: number;
    startShiftDate: Date;
    endShiftDate: Date
    rides: any;
    accountActive: boolean;
    createdAt: Date

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

    startShiftDate: {
        type: Date,
        default: Date.now
    },

    endShiftDate: {
        type: Date,
        default: Date.now
    },
    
    accountActive: {
        type: Boolean,
        default: false
    },

    storePoints: {
      type: Number,
      default: 0
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
    }],


    createdAt: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true});

//@ description: Pre-middleware function which hashes the user password before saving it to the database
UserSchema.pre('save', async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    const SALT_ROUNDS = 10;

    return next();
})

UserSchema.methods.fetchAuthToken = function() {

}

UserSchema.methods.comparePasswords = async function(enteredPassword: string) {
   return bcrypt.compare()
}


const User = mongoose.model("User", UserSchema);
export {User}