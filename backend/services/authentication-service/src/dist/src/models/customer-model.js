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
exports.Customer = exports.CustomerSchema = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'backend/services/authentication/config.env' });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.CustomerSchema = new mongoose_1.default.Schema({
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
        type: String,
        required: [true, "Please specify the region you are in"]
    },
    contactPhone: {
        type: String,
        required: [true, "Please provide a valid phone number for the user"]
    },
    isAccountActive: {
        type: Boolean,
        default: false
    },
    isAccountLocked: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        default: 0,
        required: [true, "Please specify how many in-store points this customer has by default"]
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
// Hash password before saving to database
exports.CustomerSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const SALT_ROUNDS = 10;
        const passwordSalt = yield bcryptjs_1.default.genSalt(SALT_ROUNDS);
        this.password = yield bcryptjs_1.default.hash(this.password, passwordSalt);
        return next();
    });
});
// Compare login passwords using bcrypt
exports.CustomerSchema.methods.comparePasswords = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
// Sign the JWT Token
exports.CustomerSchema.methods.fetchAuthToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id, email: this.email }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });
};
const Customer = mongoose_1.default.model("Customer", exports.CustomerSchema);
exports.Customer = Customer;
