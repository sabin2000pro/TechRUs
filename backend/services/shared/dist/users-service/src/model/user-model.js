"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
require('dotenv').config();
var mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
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
    password: {
        type: String,
        required: [true, "Please provide a valid password"],
        select: false
    },
    role: {
        type: String,
        default: 'user',
        enum: ['manager', 'admin', 'user']
    },
    isActive: {
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
    rides: [{
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
}, { timestamps: true });
var User = mongoose_1.default.model("User", exports.UserSchema);
exports.User = User;
