"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const auth_controllers_1 = require("../controllers/auth-controllers");
console.log(`Auth Router : `, authRouter);
authRouter.route('/register').post(auth_controllers_1.registerUser);
authRouter.route('/login').post(auth_controllers_1.loginUser);
authRouter.route('/forgot-password').post(auth_controllers_1.forgotPassword);
authRouter.route('/reset-password/:resetToken').put(auth_controllers_1.resetPassword);
authRouter.route('/me').get(auth_controllers_1.fetchLoggedInUser); // Route to fetch the currently logged in user
authRouter.route('/logout').get(auth_controllers_1.logoutUser);
authRouter.route('/update-password').put(auth_controllers_1.updatePassword);
