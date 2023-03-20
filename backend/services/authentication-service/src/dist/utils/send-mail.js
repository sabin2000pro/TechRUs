"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailTransporter = void 0;
require('dotenv').config();
const nodemailer_1 = __importDefault(require("nodemailer"));
// Configure environment variables for the e-mail tansporter
const createEmailTransporter = () => {
    return nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: 2525,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};
exports.createEmailTransporter = createEmailTransporter;
