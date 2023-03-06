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
exports.verifyUserAuthentication = void 0;
const http_status_codes_1 = require("http-status-codes");
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user-model");
const verifyUserAuthentication = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (!token) {
            return response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ sucess: false, message: "You are unauthorized to access this resource" });
        }
        // Verify authorization header
        if (request.headers.authorization && request.headers.authorization.includes("Bearer")) {
            token = request.headers.authorization.split(" ")[1]; // Split by a space to take out the bearer token from the authorization header
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        request.customer = yield user_model_1.User.findById(decoded._id);
        console.log(`Request user : `, request.customer);
        return next();
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
});
exports.verifyUserAuthentication = verifyUserAuthentication;
