import express, {Router} from 'express';
import { registerUser, verifyEmailAddress, loginUser, fetchAllUsers, fetchUserByID, editUserByID, editUserShifts, deleteUserByID, deleteAllUsers, forgotPassword, fetchLoggedInUser, logoutUser, updatePassword, resetPassword, verifyLoginMFA, resendEmailVerificationCode } from '../controllers/auth-controllers';
import {verifyUserAuthentication} from '../middleware/verify-user-auth';

export const authRouter: Router = express.Router();

authRouter.route('/register').post(registerUser as any);
authRouter.route('/verify-email').post(verifyEmailAddress)
authRouter.route('/verify-login').post(verifyLoginMFA as any);
authRouter.route('/resend-email-verification').post(resendEmailVerificationCode as any);
authRouter.route('/login').post(loginUser as any);
authRouter.route('/forgot-password').post(forgotPassword as any);
authRouter.route('/me').get(verifyUserAuthentication, fetchLoggedInUser as any); // Route to fetch the currently logged in user, takes in a middleware that verifies and decodes the user obejct
authRouter.route('/logout').get(logoutUser as any);

authRouter.route('/reset-password/:resetToken').put(resetPassword as any);
authRouter.route('/update-password').put(verifyUserAuthentication, updatePassword as any);

// ADMIN - USER ROUTES
authRouter.route('/users').get(fetchAllUsers).delete(deleteAllUsers);
authRouter.route('/users/:id').get(fetchUserByID).put(editUserByID).delete(deleteUserByID as any);
authRouter.route('/users/:id/update-shifts').put(editUserShifts as any);