import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IEmailVerificationSchema {
    owner: mongoose.Schema.Types.ObjectId,
    otpToken: string;
    expiresAt: Date;
    createdAt: Date;
    compareVerificationTokens: (currentOTP: string) => any
}

export const EmailVerificationSchema = new mongoose.Schema<IEmailVerificationSchema>({

    owner: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Customer",
       required: [true, "Please specify the owner of this OTP"]
    },

    otpToken: {
       type: String,
       required: [true, "Please specify the OTP for the e-mail verification"],
       default: ''
    },

    expiresAt: { // Expiration of the token
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

    
}, {timestamps: true});

// hash the OTP token before saving to database

EmailVerificationSchema.pre('save', async function(next) {

    if(!this.isModified("otpToken")) {
        return next();
    }

    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    this.otpToken = await bcrypt.hash(this.otpToken, salt);
    return next();

})

const EmailVerification = mongoose.model("EmailVerification", EmailVerificationSchema);
export {EmailVerification};