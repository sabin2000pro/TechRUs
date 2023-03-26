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
exports.fetchProductReviews = exports.fetchUserOrders = void 0;
const http_status_codes_1 = require("http-status-codes");
const axios_1 = __importDefault(require("axios"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const LOGGED_IN_USER_ENDPOINT = `http://auth-service:5400/api/v1/auth/me`;
exports.fetchUserOrders = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = request.headers;
    const loggedInUserResponse = yield axios_1.default.get(LOGGED_IN_USER_ENDPOINT, { headers: { Authorization: authorization } });
    console.log(`Logged In user Response : `, loggedInUserResponse);
    // Extract the user ID from the logged-in user response
    const userId = loggedInUserResponse.data._id;
    console.log(`User ID : `, userId);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
}));
exports.fetchProductReviews = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
