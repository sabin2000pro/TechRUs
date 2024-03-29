require('dotenv').config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUserSchemaDocument {
    username: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    isAccountLocked: boolean;
    image: string;
    storePoints: number;
    startShiftDate: Date;
    endShiftDate: Date
    accountActive: boolean;
    createdAt: Date

    fetchAuthToken: () => any;
    comparePasswords: (enteredPassword: string) => Promise<Boolean>;
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

    image: {
        type: String,
        default: 'no-avatar.jpg'
    },

    isActive: { // Is the customer's account active or not
        type: Boolean,
        default: false
    },

    isAccountLocked: {
        type: Boolean,
        default: false
    },

    isVerified: { // Determines if the user account is verified or not
        type: Boolean,
        default: false
    },

    startShiftDate: { // users start shift in the store
        type: Date,
        default: Date.now
    },

    endShiftDate: { // The user's end shift date
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
    
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt); // Hash the password before saving to DB

    return next();
})

UserSchema.methods.fetchAuthToken = function() { // Function responsible for returning the signed JWT token
    return jwt.sign({_id: this._id, email: this.email}, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN})
}

UserSchema.methods.comparePasswords = async function(enteredPassword: string): Promise<Boolean> {
   return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", UserSchema);
export {User}