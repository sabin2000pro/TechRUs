"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        default: 'staff',
        enum: ['manager', 'admin', 'staff']
    },
    image: {
        type: String,
        default: 'no-avatar.jpg'
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
    startShiftDate: {
        type: Date,
        default: Date.now
    },
    endShiftDate: {
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
}, { timestamps: true });
//@ description: Pre-middleware function which hashes the user password before saving it to the database
exports.UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const SALT_ROUNDS = 10;
        const salt = yield bcryptjs_1.default.genSalt(SALT_ROUNDS);
        this.password = yield bcryptjs_1.default.hash(this.password, salt); // Hash the password before saving to DB
        return next();
    });
});
exports.UserSchema.methods.fetchAuthToken = function () {
    return jsonwebtoken_1.default.sign({ _id: this._id, email: this.email }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });
};
exports.UserSchema.methods.comparePasswords = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
const User = mongoose_1.default.model("User", exports.UserSchema);
exports.User = User;
