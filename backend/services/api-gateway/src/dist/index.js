"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenApiGatewayServer = void 0;
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const api_gateway_logger_1 = require("./api-gateway-logger");
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env' });
const logger = (0, api_gateway_logger_1.logInfo)();
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 6000;
const API_GATEWAY_DEV_MODE = process.env.API_GATEWAY_DEV_MODE || 'development';
const API_GATEWAY_API = process.env.API_GATEWAY_API || '/api/gateway';
const listenApiGatewayServer = () => {
    try {
        return app_1.app.listen(API_GATEWAY_PORT, () => {
            console.log(`The API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`);
            logger.info(`The API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`);
        });
    }
    catch (error) {
        if (error) {
            console.error(error);
            logger.error(error);
        }
    }
};
exports.listenApiGatewayServer = listenApiGatewayServer;
(0, exports.listenApiGatewayServer)(); // listen for requests on the API gateway server
