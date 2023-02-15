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
exports.fetchLoggedInUser = exports.resetPassword = exports.updatePassword = exports.forgotPassword = exports.verifyLoginMFA = exports.logoutUser = exports.loginUser = exports.verifyEmailAddress = exports.registerUser = exports.sendResetPasswordTokenStatus = exports.verifyCustomerExists = void 0;
const generate_otp_code_1 = require("./../utils/generate-otp-code");
const customer_model_1 = require("../models/customer-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const error_response_1 = require("../utils/error-response");
const error_handler_1 = require("../middleware/error-handler");
const verifyCustomerExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_model_1.Customer.findOne({ email });
});
exports.verifyCustomerExists = verifyCustomerExists;
const sendResetPasswordTokenStatus = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ isTokenValid: true });
});
exports.sendResetPasswordTokenStatus = sendResetPasswordTokenStatus;
exports.registerUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role, zipcode, country, phone } = request.body;
        if (!username || !email || !password || !role || !zipcode || !country || !phone) {
            return next(new error_response_1.ErrorResponse(`Some of the fields are missing, please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (yield (0, exports.verifyCustomerExists)(email)) { // If the user already exists
            return next(new error_response_1.ErrorResponse('The user with that e-mail address already exists in our server', http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const currentCustomer = yield customer_model_1.Customer.create({ username, email, password, role, zipcode, country });
        const token = currentCustomer.fetchAuthToken();
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, currentCustomer, token });
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.verifyEmailAddress = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, OTP } = request.body; // Extract the user id and OTP from the request body
        if (!(0, mongoose_1.isValidObjectId)(userId)) {
            return next(new error_response_1.ErrorResponse("The User ID is invalid. Please verify it again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        if (OTP === null) { // If there is no OTP present
            return next(new error_response_1.ErrorResponse("OTP is invalid, please check it again", http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const otp = (0, generate_otp_code_1.generateOTPCode)(); // Get the generated e-mail verification code
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User e-mail verified" });
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        let session = request.session;
        if (!email || !password) {
            return next(new error_handler_1.BadRequestError(`Missing e-mail address or password. Check entries`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const customer = yield customer_model_1.Customer.findOne({ email });
        if (!customer) {
            return next(new error_handler_1.BadRequestError(`Could not find that user`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Check if the passwords match
        const passwordsMatch = yield customer.comparePasswords(password);
        if (!passwordsMatch) {
            return next(new error_response_1.ErrorResponse(`Passwords invalid, please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const token = customer.fetchAuthToken();
        session = { token };
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, customer, token });
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.logoutUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request.session = null;
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.verifyLoginMFA = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, mfaCode } = request.body;
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.forgotPassword = (0, express_async_handler_1.default)((request, respons, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentEmail } = request.body;
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.updatePassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = request.body;
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.resetPassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
exports.fetchLoggedInUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = request.user; // Store the user in the user object
    }
    catch (error) {
        if (error) {
            return next(error);
        }
    }
}));
