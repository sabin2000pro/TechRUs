require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('bcryptjs')

const UserSchema = new mongoose.Schema({ // User Data Model
    username: {
        type: String,
        required: [true, "Please provide a valid username for the user"],
        min: [4, "Username must have at least 4 characters"],
        max: [12, "Username cannot exceed 12 characters"]
    },

    email: {
        type: String,
        required: [true, "Please provide a valid e-mail address for the user"],
        unique: true
    },

    password: { // user password
        type: String,
        required: [true, "Please provide a valid password"],
        select: false
    },

    role: { // User Role Field
        type: String,
        required: [true, "Please provide a valid role for the user"],
        enum: ["Admin", "User"]
    },

    zipcode: {
        type: String,
        required: [true, "Please provide a valid zipcode for the user"]
    },

    country: {
        type: String,
        required: [true, "Please provide a valid country of residence for the user"]
    },

    phone: {
        type: String,
        required: [true, "Please provide a valid phone number for the user"]
    }


}, {timestamps: true});

// Hash password before saving to database
UserSchema.pre('save', async function(next) {

})

// Compare login passwords using bcrypt

const User = mongoose.model("User", UserSchema);
module.exports = User;