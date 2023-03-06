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
exports.fetchLoggedInCustomer = exports.resetPassword = exports.updatePassword = exports.forgotPassword = exports.verifyLoginMFA = exports.logoutUser = exports.loginUser = exports.resendEmailVerificationCode = exports.verifyEmailAddress = exports.registerUser = exports.sendResetPasswordTokenStatus = exports.sendTokenResponse = exports.sendForgotPasswordResetLink = exports.sendLoginMfa = exports.sendEmailConfirmationEmail = exports.verifyUserExists = exports.rootRoute = void 0;
const verify_email_model_1 = require("./../models/verify-email-model");
const send_mail_1 = require("./../utils/send-mail");
const generate_otp_code_1 = require("./../utils/generate-otp-code");
const user_model_1 = require("../models/user-model");
const two_factor_model_1 = require("../models/two-factor-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const error_response_1 = require("../utils/error-response");
const password_reset_model_1 = require("../models/password-reset-model");
exports.rootRoute = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Root Route Auth!" });
}));
const verifyUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ email }); // Returns true or false if the user with that e-mail address already exists in the database
});
exports.verifyUserExists = verifyUserExists;
// @description: Sends the verify confirmation e-mail to the user after registering an account
// @parameters: Transporter Object, User Object, Randomly Generated User OTP
// @returns: void
// @public: True (No Authorization Required)
const sendEmailConfirmationEmail = (transporter, newUser, userOTP) => {
    return transporter.sendMail({
        from: 'verification@techrus.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>

        `
    });
};
exports.sendEmailConfirmationEmail = sendEmailConfirmationEmail;
const sendLoginMfa = (transporter, user, userMfa) => {
    return transporter.sendMail({
        from: 'mfa@techrus.com',
        to: user.email,
        subject: 'Login MFA Verification',
        html: `
        
        <p>Your MFA code</p>
        <h1> ${userMfa}</h1>
        `
    });
};
exports.sendLoginMfa = sendLoginMfa;
const sendForgotPasswordResetLink = (user, resetPasswordURL) => {
    const transporter = (0, send_mail_1.createEmailTransporter)();
    return transporter.sendMail({
        from: 'resetpassword@techrus.dev',
        to: user.email,
        subject: 'Reset Password',
        html: `
        
        <h1> ${resetPasswordURL}</h1>
        `
    });
};
exports.sendForgotPasswordResetLink = sendForgotPasswordResetLink;
const sendTokenResponse = (request, user, statusCode, response) => {
    const token = user.fetchAuthToken();
    request.session = { token }; // Store the token in the session
    return response.status(statusCode).json({ token, user }); // Send back the user object with the JWT which will be used in the frontend in a ProtectedRoutes Component used to verify if the user is currently logged in or not
};
exports.sendTokenResponse = sendTokenResponse;
const sendResetPasswordTokenStatus = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ isTokenValid: true });
});
exports.sendResetPasswordTokenStatus = sendResetPasswordTokenStatus;
exports.registerUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
        return next(new error_response_1.ErrorResponse(`Some of the fields are missing, please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (yield (0, exports.verifyUserExists)(email)) { // If the user already exists
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "Staff Already exists with that e-mail address" });
    }
    const user = yield user_model_1.User.create({ username, email, password });
    yield user.save();
    const userOTP = (0, generate_otp_code_1.generateCode)(); // Generate the OTP
    const customerVerification = new two_factor_model_1.TwoFactorVerification({ owner: user._id, mfaToken: userOTP });
    yield customerVerification.save();
    // Create the e-mail transporter to send the MFA token to the user's e-mail address
    const emailTransporter = (0, send_mail_1.createEmailTransporter)();
    (0, exports.sendEmailConfirmationEmail)(emailTransporter, user, userOTP);
    const userOTPVerification = new verify_email_model_1.EmailVerification({ owner: user._id, otpToken: userOTP });
    console.log(`Your User OTP Verification`);
    yield userOTPVerification.save(); // Save the User OTP token to the database after creating a new instance of OTP
    return (0, exports.sendTokenResponse)(request, user, http_status_codes_1.StatusCodes.CREATED, response); // Send back the response to the user
}));
exports.verifyEmailAddress = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, OTP } = request.body; // Extract the user id and OTP from the request body
    const currentCustomer = yield user_model_1.User.findById(userId);
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_response_1.ErrorResponse("The User ID is invalid. Please verify it again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!OTP) { // If there is no OTP present
        return next(new error_response_1.ErrorResponse("OTP is invalid, please check it again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!currentCustomer) {
        return next(new error_response_1.ErrorResponse(`Customer that ID ${userId} does not exist`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User e-mail verified" });
}));
exports.resendEmailVerificationCode = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, OTP } = request.body;
    const currentCustomer = yield user_model_1.User.findById(userId);
    if (!currentCustomer) { // If we have no current user
        return next(new error_response_1.ErrorResponse("Current user does not exist. Check user again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_response_1.ErrorResponse("Owner ID invalid. Check again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!OTP) {
        return next(new error_response_1.ErrorResponse(`No OTP found. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const token = yield verify_email_model_1.EmailVerification.findOne({ owner: userId });
    if (!token) {
        return next(new error_response_1.ErrorResponse("User verification token not found", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Fetch the generated token
    const otpToken = (0, generate_otp_code_1.generateCode)();
    if (!otpToken) {
        return next(new error_response_1.ErrorResponse("OTP Token generated is invalid.", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const newToken = yield verify_email_model_1.EmailVerification.create({ owner: currentCustomer, token: otpToken }); // Create a new instance of the token
    yield newToken.save(); // Save the new token
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "E-mail Verification Re-sent" });
}));
exports.loginUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "Missing e-mail address or password" });
    }
    const user = yield user_model_1.User.findOne({ email }).select("+password"); // Find the user before logging in
    if (!user) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "No customer found with that e-mail address" });
    }
    // Check if the passwords match
    const userPasswordsMatch = yield user.comparePasswords(password);
    if (!userPasswordsMatch) {
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: false, message: "Your passwords do not match. Try again" });
    }
    const customerMfaToken = (0, generate_otp_code_1.generateCode)();
    const transporter = (0, send_mail_1.createEmailTransporter)();
    (0, exports.sendLoginMfa)(transporter, user, customerMfaToken);
    const loginMfa = yield two_factor_model_1.TwoFactorVerification.create({ owner: user, mfaToken: customerMfaToken });
    yield loginMfa.save();
    return (0, exports.sendTokenResponse)(request, user, http_status_codes_1.StatusCodes.CREATED, response);
}));
exports.logoutUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    request.session = null;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "You have logged out successfully", user: null });
}));
exports.verifyLoginMFA = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, multiFactorToken } = request.body;
    const customer = yield user_model_1.User.findById(userId);
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_response_1.ErrorResponse(`This user ID is not valid. Please try again`, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    if (!multiFactorToken) {
        customer.isActive = false; // User is not active yet
        return next(new error_response_1.ErrorResponse("Please provide your MFA token", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const factorToken = yield two_factor_model_1.TwoFactorVerification.findOne({ owner: userId });
    if (!factorToken) {
        return next(new error_response_1.ErrorResponse(`The 2FA token associated to the user is invalid `, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    // Check to see if the tokens match
    const mfaTokensMatch = yield factorToken.compareVerificationTokens(multiFactorToken);
    if (!mfaTokensMatch) { // If tokens don't match
        customer.isActive = (!customer.isActive);
        customer.isVerified = (!customer.isVerified);
        return next(new error_response_1.ErrorResponse("The MFA token you entered is invalid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const newToken = yield two_factor_model_1.TwoFactorVerification.create({ owner: customer, mfaToken: multiFactorToken }); // Create a new instance of the token
    yield newToken.save(); // Save the new token
    customer.isVerified = true; // User account is now verified
    customer.isActive = true; // And user account is active
    return response.status(http_status_codes_1.StatusCodes.OK).json({ customer, message: "Your account is now active" });
}));
exports.forgotPassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield user_model_1.User.findOne({ email });
    // Check if we have an e-mail in the body of the request
    if (!email) {
        return next(new error_response_1.ErrorResponse(`User with that e-mail not found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!user) {
        return next(new error_response_1.ErrorResponse("No user found with that e-mail address", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const userHasResetToken = yield password_reset_model_1.PasswordReset.findOne({ owner: user._id });
    if (userHasResetToken) {
        return next(new error_response_1.ErrorResponse("User already has the password reset token", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const token = (0, generate_otp_code_1.generateCode)();
    if (token === undefined) { // If no token exists
        return next(new error_response_1.ErrorResponse("Reset Password Token is invalid", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const resetPasswordToken = yield password_reset_model_1.PasswordReset.create({ owner: user._id, resetToken: token }); // Create an instance of the Password Reset model
    yield resetPasswordToken.save();
    const resetPasswordURL = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`; // Create the reset password URL
    (0, exports.sendForgotPasswordResetLink)(user, resetPasswordURL); // Send the reset password e-mail to the customer
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Reset Password E-mail Sent", email });
}));
exports.updatePassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = request.body;
    if (!newPassword) {
        return next(new error_response_1.ErrorResponse("Please provide your new password", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const customer = yield user_model_1.User.findById(request.user._id);
    if (!customer) {
        return next(new error_response_1.ErrorResponse("No user found", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const currentPasswordMatch = customer.comparePasswords(currentPassword);
    if (!currentPasswordMatch) { // If passwords do not match
        return next(new error_response_1.ErrorResponse("Current user password is invalid.", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    customer.password = request.body.newPassword;
    yield customer.save(); // Save new user
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User password updated" });
}));
exports.resetPassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPassword = request.body.currentPassword;
    const newPassword = request.body.newPassword;
    const resetToken = request.params.token;
    if (!currentPassword) {
        return next(new error_response_1.ErrorResponse("Current password missing. Please try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!newPassword) {
        return next(new error_response_1.ErrorResponse("Please specify the new password", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const customer = yield user_model_1.User.findOne({ owner: request.customer.id, token: resetToken });
    if (!customer) {
        return next(new error_response_1.ErrorResponse("No user found", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const customerPasswordsMatch = yield customer.comparePasswords(currentPassword); // Check if passwords match before resetting password
    if (!customerPasswordsMatch) {
        return next(new error_response_1.ErrorResponse("Current Password Invalid", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    customer.password = newPassword;
    yield customer.save(); // Save new user after reset the password
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Customer Password Reset Successfully" });
}));
exports.fetchLoggedInCustomer = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user._id; // Store the user in the user object
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
}));
