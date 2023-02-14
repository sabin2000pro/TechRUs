"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAuthServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env' });
const AUTH_PORT = process.env.AUTH_PORT || 5400;
const AUTH_DEV_MODE = process.env.AUTH_DEV_MODE || 'development';
const startAuthServer = () => {
    try {
        return console.log(`The Authentication server is listening on port ${AUTH_PORT} in mode ${AUTH_DEV_MODE}`);
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
};
exports.startAuthServer = startAuthServer;
(0, exports.startAuthServer)(); // listen for requests on the API gateway server
