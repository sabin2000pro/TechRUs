"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTPCode = void 0;
const generateOTPCode = (OTP_LENGTH = 6) => {
    let OTP = '';
    for (let i = 1; i <= OTP_LENGTH; i++) {
        const randomOTP = Math.floor(Math.random() * OTP_LENGTH);
        OTP += randomOTP;
    }
    return OTP;
};
exports.generateOTPCode = generateOTPCode;
