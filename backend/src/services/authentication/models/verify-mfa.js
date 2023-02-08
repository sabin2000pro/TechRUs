require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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