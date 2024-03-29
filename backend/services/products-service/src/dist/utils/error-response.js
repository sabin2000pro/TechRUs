"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message); // Inherit the message from the base error class
        this.statusCode = statusCode;
    }
}
exports.ErrorResponse = ErrorResponse;
