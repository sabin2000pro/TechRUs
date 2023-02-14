"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenApiGatewayServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env' });
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 6000;
const API_GATEWAY_DEV_MODE = process.env.API_GATEWAY_DEV_MODE || 'development';
const listenApiGatewayServer = () => {
    try {
        return console.log(`API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`);
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
};
exports.listenApiGatewayServer = listenApiGatewayServer;
(0, exports.listenApiGatewayServer)(); // listen for requests on the API gateway server
