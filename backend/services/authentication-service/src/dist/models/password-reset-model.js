"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PasswordResetSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "customer",
        required: [true, "Please specify the current owner of this password reset token"]
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const PasswordReset = mongoose_1.default.model("PasswordReset", PasswordResetSchema);
exports.PasswordReset = PasswordReset;
