require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const VerifyEmailAddressSchema = new mongoose.Schema({
    owner: {

    },

    otp: {

    },

    expiresAt: {
        
    },

    createdAt: {
        
    }
});

const VerifyEmailAddress = mongoose.model("VerifyEmailAddress", VerifyEmailAddressSchema);
module.exports = VerifyEmailAddress;