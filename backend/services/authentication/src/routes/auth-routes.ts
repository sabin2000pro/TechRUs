import express, {Router} from 'express';
import { registerUser, verifyEmailAddress, loginUser, fetchAllUsers, fetchUserByID, editUserByID, editUserShifts, deleteUserByID, deleteAllUsers, forgotPassword, fetchLoggedInCustomer, logoutUser, updatePassword, resetPassword } from '../controllers/auth-controllers';
import {verifyUserAuthentication} from '../middleware/verify-user-auth';

export const authRouter: Router = express.Router();

authRouter.route('/register').post(registerUser as any);
authRouter.route('/verify-email').post(verifyEmailAddress)
authRouter.route('/login').post(loginUser as any);
authRouter.route('/forgot-password').post(forgotPassword as any);
authRouter.route('/me').get(verifyUserAuthentication, fetchLoggedInCustomer as any); // Route to fetch the currently logged in user, takes in a middleware that verifies and decodes the user obejct
authRouter.route('/logout').get(logoutUser as any);

authRouter.route('/reset-password/:resetToken').put(resetPassword as any);
authRouter.route('/update-password').put(updatePassword as any);

// ADMIN - USER ROUTES
authRouter.route('/users').get(fetchAllUsers).delete(deleteAllUsers);
authRouter.route('/users/:id').get(fetchUserByID).put(editUserByID).delete(deleteUserByID);

authRouter.route('/users/:id/edit-shifts').put(editUserShifts);