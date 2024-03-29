"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth-controllers");
const verify_user_auth_1 = require("../middleware/verify-user-auth");
exports.authRouter = express_1.default.Router();
exports.authRouter.route('/register').post(auth_controllers_1.registerUser);
exports.authRouter.route('/verify-email').post(auth_controllers_1.verifyEmailAddress);
exports.authRouter.route('/verify-login').post(auth_controllers_1.verifyLoginMFA);
exports.authRouter.route('/resend-email-verification').post(auth_controllers_1.resendEmailVerificationCode);
exports.authRouter.route('/login').post(auth_controllers_1.loginUser);
exports.authRouter.route('/forgot-password').post(auth_controllers_1.forgotPassword);
exports.authRouter.route('/me').get(verify_user_auth_1.verifyUserAuthentication, auth_controllers_1.fetchLoggedInUser); // Route to fetch the currently logged in user, takes in a middleware that verifies and decodes the user obejct
exports.authRouter.route('/logout').get(auth_controllers_1.logoutUser);
exports.authRouter.route('/reset-password/:resetToken').put(auth_controllers_1.resetPassword);
exports.authRouter.route('/update-password').put(verify_user_auth_1.verifyUserAuthentication, auth_controllers_1.updatePassword);
// ADMIN - USER ROUTES
exports.authRouter.route('/users').get(auth_controllers_1.fetchAllUsers).delete(auth_controllers_1.deleteAllUsers);
exports.authRouter.route('/users/:id').get(auth_controllers_1.fetchUserByID).put(auth_controllers_1.editUserByID).delete(auth_controllers_1.deleteUserByID);
exports.authRouter.route('/users/:id/update-shifts').put(auth_controllers_1.editUserShifts);
