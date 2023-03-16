"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
require('dotenv').config();
const error_response_1 = require("../utils/error-response");
const http_status_codes_1 = require("http-status-codes");
let ERROR_TYPES = ['CastError'];
const errorHandler = (err, request, response, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    error.statusCode = err.statusCode;
    error.stack = err.stack;
    if (process.env.AUTH_SERVICE_NODE_ENV === 'development') {
        if (err.code === 11000) {
            const message = `Duplicate resource found on the server ${Object.keys(err.keyValue)}`;
            error = new error_response_1.ErrorResponse(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (err.name === ERROR_TYPES[0]) {
            const message = `Resource not found on the server. Invalid : ${err.path}`;
            error = new error_response_1.ErrorResponse(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }
    console.log(error);
    return response.status(error.statusCode).json({ success: false, message: error.message, stack: error.stack });
};
exports.errorHandler = errorHandler;
