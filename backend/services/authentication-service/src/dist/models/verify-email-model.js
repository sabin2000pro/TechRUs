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
exports.EmailVerification = exports.EmailVerificationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.EmailVerificationSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
// hash the OTP token before saving to database
exports.EmailVerificationSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("otpToken")) {
            return next();
        }
        const SALT_ROUNDS = 10;
        const salt = yield bcryptjs_1.default.genSalt(SALT_ROUNDS);
        this.otpToken = yield bcryptjs_1.default.hash(this.otpToken, salt);
        return next();
    });
});
exports.EmailVerificationSchema.methods.compareVerificationTokens = function (enteredToken) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredToken, this.otpToken);
    });
};
const EmailVerification = mongoose_1.default.model("EmailVerification", exports.EmailVerificationSchema);
exports.EmailVerification = EmailVerification;
