"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorVerification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TwoFactorSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const TwoFactorVerification = mongoose_1.default.model("TwoFactorVerification", TwoFactorSchema);
exports.TwoFactorVerification = TwoFactorVerification;
