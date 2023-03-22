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
exports.uploadUserAvatar = exports.deleteAllUsers = exports.deleteUserByID = exports.editUserShifts = exports.editUserByID = exports.fetchUserByID = exports.fetchAllUsers = exports.fetchLoggedInUser = exports.resetPassword = exports.updatePassword = exports.forgotPassword = exports.verifyLoginMFA = exports.logoutUser = exports.loginUser = exports.resendEmailVerificationCode = exports.verifyEmailAddress = exports.registerUser = exports.sendResetPasswordTokenStatus = exports.sendTokenResponse = exports.sendForgotPasswordResetLink = exports.sendLoginMfa = exports.sendEmailConfirmationEmail = exports.verifyUserExists = exports.rootRoute = void 0;
const verify_email_model_1 = require("../models/verify-email-model");
const send_mail_1 = require("../utils/send-mail");
const generate_otp_code_1 = require("../utils/generate-otp-code");
const user_model_1 = require("../models/user-model");
const path_1 = __importDefault(require("path"));
const two_factor_model_1 = require("../models/two-factor-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const error_response_1 = require("../utils/error-response");
const password_reset_model_1 = require("../models/password-reset-model");
// @API Description: Returns the JSON for the root route of the authentication service
// @method: GET
// @route: /api/v1/auth
// @access: Public (No Authorization Required)
exports.rootRoute = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.method === 'GET') {
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Root Route Auth!" });
    }
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
    const transporter = (0, send_mail_1.createEmailTransporter)(); // Create instance of the e-mail transporter
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
    const userOTPVerificationCode = new verify_email_model_1.EmailVerification({ owner: user._id, otpToken: userOTP }) || undefined;
    if (userOTPVerificationCode === undefined) {
        return next(new error_response_1.ErrorResponse(`The OTP Verification code is invalid`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    yield userOTPVerificationCode.save(); // Save the User OTP token to the database after creating a new instance of OTP
    return (0, exports.sendTokenResponse)(request, user, http_status_codes_1.StatusCodes.CREATED, response); // Send back the response to the user
}));
exports.verifyEmailAddress = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, OTP } = request.body;
    const user = yield user_model_1.User.findById(userId);
    // Check for invalid User ID
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_response_1.ErrorResponse("User ID not found. Please check your entry again.", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    // Check for missing OTP
    if (!OTP) {
        return next(new error_response_1.ErrorResponse("OTP Entered not found. Please check your entry", http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if (!user) {
        return next(new error_response_1.ErrorResponse(`No user found with that ID`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // If the user is already verified
    if (user.isVerified) {
        return next(new error_response_1.ErrorResponse(`User account is already verified`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (user.isActive) { // If the user account is already active before verifying their e-mail address, send back error
        return next(new error_response_1.ErrorResponse(`User account is already active`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const token = yield verify_email_model_1.EmailVerification.findOne({ owner: userId }); // Find a verification token
    if (!token) {
        return next(new error_response_1.ErrorResponse(`OTP Verification token is not found. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const otpTokensMatch = yield token.compareVerificationTokens(OTP); // Check if they match
    if (!otpTokensMatch) {
        return next(new error_response_1.ErrorResponse(`The token you entered does not match the one in the database.`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (otpTokensMatch) { // If the OTP Tokens Match
        user.isVerified = true; // Set the user is Verified field to true
        user.accountActive = true;
        yield user.save();
        yield verify_email_model_1.EmailVerification.findByIdAndDelete(token._id); // Find the token that belongs to the user and delete it
        const transporter = (0, send_mail_1.createEmailTransporter)();
        // Send welcome e-mail
        transporter.sendMail({
            from: 'welcome@techrus.com',
            to: user.email,
            subject: 'E-mail Confirmation Success',
            html: `
                
                <h1> Welcome to TechRUs. Thank you for confirming your e-mail address.</h1>
                `
        });
        const jwtToken = user.fetchAuthToken();
        request.session = { token: jwtToken } || undefined; // Get the authentication JWT token
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "E-mail Address verified" });
    }
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
    const { email, password } = request.body; // Extract the user e-mail and password from the request body
    if (!email || !password) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "Missing e-mail address or password" });
    }
    const user = yield user_model_1.User.findOne({ email }).select("+password"); // Find the user before logging in
    if (!user) {
        return next(new error_response_1.ErrorResponse(`No user found with that e-mail address`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Check if the passwords match
    const userPasswordsMatch = yield user.comparePasswords(password);
    if (!userPasswordsMatch) {
        return next(new error_response_1.ErrorResponse(`Your current password is invalid. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const userMfaToken = (0, generate_otp_code_1.generateCode)();
    const token = user.fetchAuthToken();
    const transporter = (0, send_mail_1.createEmailTransporter)();
    (0, exports.sendLoginMfa)(transporter, user, userMfaToken);
    const loginMfa = yield two_factor_model_1.TwoFactorVerification.create({ owner: user, mfaToken: userMfaToken });
    yield loginMfa.save();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user, token });
}));
exports.logoutUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    request.session = null;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "You have logged out successfully", user: null });
}));
exports.verifyLoginMFA = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, multiFactorToken } = request.body;
    const user = yield user_model_1.User.findById(userId);
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return next(new error_response_1.ErrorResponse(`This user ID is not valid. Please try again`, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    if (!multiFactorToken) {
        user.isActive = false; // User is not active yet
        return next(new error_response_1.ErrorResponse("Please provide your MFA token", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const factorToken = yield two_factor_model_1.TwoFactorVerification.findOne({ owner: userId });
    if (!factorToken) {
        return next(new error_response_1.ErrorResponse(`The 2FA token associated to the user is invalid `, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    // Check to see if the tokens match
    const mfaTokensMatch = yield factorToken.compareVerificationTokens(multiFactorToken);
    if (!mfaTokensMatch) { // If tokens don't match
        user.isActive = (!user.isActive);
        user.isVerified = (!user.isVerified);
        return next(new error_response_1.ErrorResponse("The MFA token you entered is invalid. Try again", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const newToken = yield two_factor_model_1.TwoFactorVerification.create({ owner: user, mfaToken: multiFactorToken }); // Create a new instance of the token
    yield newToken.save(); // Save the new token
    user.isVerified = true; // User account is now verified
    user.isActive = true; // And user account is active
    return response.status(http_status_codes_1.StatusCodes.OK).json({ user, message: "Your account is now active" });
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
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Reset Password E-mail Sent" });
}));
exports.updatePassword = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = request.body;
    if (!newPassword) {
        return next(new error_response_1.ErrorResponse("Please provide your new password", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const user = yield user_model_1.User.findById(request.user._id);
    if (!user) {
        return next(new error_response_1.ErrorResponse("No user found", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const currentPasswordMatch = user.comparePasswords(currentPassword);
    if (!currentPasswordMatch) { // If passwords do not match
        return next(new error_response_1.ErrorResponse("Current user password is invalid.", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    user.password = request.body.newPassword;
    yield user.save(); // Save new user
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
exports.fetchLoggedInUser = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.user; // Store the user in the user object
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
}));
exports.fetchAllUsers = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultsPerPage = 3; // How many users to display per page
    const currentPage = parseInt(request.query.page) || 1; // Get the current page number by parsing the page in the request query
    const searchKey = request.query.keyword;
    const skipPagesBy = resultsPerPage * (currentPage - 1); // How many pages to skip by
    const keyword = request.query.keyword ? { name: { $regex: searchKey, $options: 'i' } } : {}; // Keyword used to search for a product
    const totalUsers = yield user_model_1.User.countDocuments(Object.assign({}, keyword));
    const users = yield user_model_1.User.find(Object.assign({}, keyword)).limit(resultsPerPage).skip(skipPagesBy); // Find users with the search keywod if provided and limit by the number of pages
    if (!users) {
        return next(new error_response_1.ErrorResponse(`No users found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, users, totalUsers });
}));
exports.fetchUserByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const user = yield user_model_1.User.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`No ID provided. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!user) {
        return next(new error_response_1.ErrorResponse(`No user found with that ID ${id} - pleasae try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
}));
exports.editUserByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    let user = yield user_model_1.User.findById(id);
    if (!user) {
        return next(new error_response_1.ErrorResponse(`No user found with that ID`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    user = yield user_model_1.User.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
}));
exports.editUserShifts = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const { startShiftDate, endShiftDate } = request.body;
    const fieldsToUpdate = { startShiftDate, endShiftDate };
    let user = yield user_model_1.User.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`ID invalid`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // Validate Start and End Shift Dates
    if (!startShiftDate || !endShiftDate) {
        return next(new error_response_1.ErrorResponse(`Start or end shift dates are missing`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (new Date(startShiftDate) > new Date(endShiftDate)) {
        return next(new error_response_1.ErrorResponse(`Start shift date cannot be later than the end`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    user = yield user_model_1.User.findByIdAndUpdate(id, fieldsToUpdate, { new: true, runValidators: true });
    yield user.save();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Shifts updated successfully" });
}));
exports.deleteUserByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`User ID is invalid. Please check your ID again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    yield user_model_1.User.findByIdAndDelete(id);
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "User deleted succesfully" });
}));
exports.deleteAllUsers = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.deleteMany();
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "Users deleted" });
}));
exports.uploadUserAvatar = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = request.files.file;
    if (!file) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "Please upload a valid file" });
    }
    // Check the file size
    if (file.size > process.env.PRODUCTS_SERVICE_MAX_FILE_UPLOAD_SIZE) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "File size is too large, please upload again" });
    }
    const fileName = `product_photo_${request.params.id}${path_1.default.parse(file.name).ext}`;
    file.mv(`${process.env.PRODUCTS_SERVICE_FILE_UPLOAD_PATH}/${fileName}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.error(error);
            return next(new error_response_1.ErrorResponse('Problem with file upload', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
        }
        yield user_model_1.User.findByIdAndUpdate(request.params.id, { image: `/images/${fileName}` });
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User Avatar Uploaded" });
    }));
}));
