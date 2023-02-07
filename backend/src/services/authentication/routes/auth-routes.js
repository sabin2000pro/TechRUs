const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth-controllers');

authRouter.route('/register').post(authController.registerUser);
authRouter.route('/login').post(authController.loginUser);
authRouter.route('/forgot-password')

module.exports = authRouter;