import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const VerifyLoginMFASchema = new mongoose.Schema({
    
    owner: {

    },

    mfaToken: {

    },

    expiresIn: {

    },

    createdAt: {

    }

    
});

const VerifyLoginMFA = mongoose.model("VerifyLogin", VerifyLoginMFASchema);
module.exports = VerifyLoginMFA;