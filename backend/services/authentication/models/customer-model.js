require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CustomerSchema = new mongoose.Schema({ // User Data Model

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

    postalCode: {
        type: String,
        required: [true, "Please provide a valid zipcode for the user"]
    },

    country: {
        type: String,
        required: [true, "Please provide a valid country of residence for the user"]
    },

    address: {
        type: String,
        required: [true, "Please specify the address of the customer"]
    },

    region: {

    },

    contactPhone: {
        type: String,
        required: [true, "Please provide a valid phone number for the user"]
    },

    isAccountActive: { // Is the customer's account active or not
        type: Boolean
    },

    isAccountLocked: {
        type: Boolean
    },

    points: {
        type: Number,
        default: 0,
        required: [true, "Please specify how many in-store points this customer has"]
    },

    shippingAddress: {

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

// Hash password before saving to database
CustomerSchema.pre('save', async function(next) {

    if(!this.isModified("password")) {
        return next();
    }

    const SALT_ROUNDS = 10;

    const passwordSalt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, passwordSalt);

    return next();
})

// Compare login passwords using bcrypt
CustomerSchema.methods.comparePasswords = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
} 

// Sign the JWT Token
CustomerSchema.methods.fetchAuthToken = function() {
    return jwt.sign({id: this._id, email: this.email}, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;