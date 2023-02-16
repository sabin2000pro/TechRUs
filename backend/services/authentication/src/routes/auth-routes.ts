import express, {Router} from 'express';
import { registerUser, loginUser, forgotPassword, fetchLoggedInUser, logoutUser, updatePassword, resetPassword } from '../controllers/auth-controllers';
const authRouter: Router = express.Router();

authRouter.route('/register').post(registerUser as any);
authRouter.route('/login').post(loginUser as any);
authRouter.route('/forgot-password').post(forgotPassword as any);
authRouter.route('/me').get(fetchLoggedInUser as any); // Route to fetch the currently logged in user
authRouter.route('/logout').get(logoutUser as any);

authRouter.route('/reset-password/:resetToken').put(resetPassword as any);
authRouter.route('/update-password').put(updatePassword as any);

export {authRouter}