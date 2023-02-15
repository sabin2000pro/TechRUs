import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ITwoFactorVerification {
    owner: mongoose.Schema.Types.ObjectId,
    mfaToken: string;
    createdAt: Date;
    expiresIn: Date;
    compareVerificationTokens: (enteredToken: string) => Promise<boolean>
}

const TwoFactorSchema = new mongoose.Schema<ITwoFactorVerification>({
    
    owner: { // owner of the token
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    mfaToken: {
       type: String,
       required: [true, "Please specify the MFA Token"]
    },

    expiresIn: {
       type: Date,
       default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const TwoFactor = mongoose.model("TwoFactor", TwoFactorSchema);
export {TwoFactor}