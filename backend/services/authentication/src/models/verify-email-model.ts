import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IVerifyEmailAddressSchemaDoc {
    owner: mongoose.Schema.Types.ObjectId,
    otpToken: string;
    expiresAt: Date;
    createdAt: Date;
}

export const VerifyEmailAddressSchema = new mongoose.Schema<IVerifyEmailAddressSchemaDoc>({

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

    expiresAt: {
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

    
}, {timestamps: true});

// hash the OTP token before saving to database

VerifyEmailAddressSchema.pre('save', async function(next) {

    if(!this.isModified("otpToken")) {
        return next();
    }

    const SALT_ROUNDS = 10;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.otpToken = await bcrypt.hash(this.otpToken, salt);

    return next();

})

const VerifyEmailAddress = mongoose.model("VerifyEmailAddress", VerifyEmailAddressSchema);
export {VerifyEmailAddress};