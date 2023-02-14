import express from 'express';
const authRouter = express.Router();
const authController = require('../controllers/auth-controllers');

authRouter.route('/register').post(authController.registerUser);
authRouter.route('/login').post(authController.loginUser);
authRouter.route('/forgot-password').post(authController.forgotPassword);
authRouter.route('/reset-password/:resetToken').put(authController.resetPassword);
authRouter.route('/me').get(authController.fetchLoggedInUser); // Route to fetch the currently logged in user
authRouter.route('/logout').get(authController.logout);

authRouter.route('/update-password').put(authController.updatePassword);

module.exports = authRouter;