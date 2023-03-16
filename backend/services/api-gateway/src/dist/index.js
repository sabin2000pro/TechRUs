"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenApiGatewayServer = void 0;
require('dotenv').config();
const app_1 = require("./app");
const api_gateway_logger_1 = require("./api-gateway-logger");
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 5410;
const API_GATEWAY_DEV_MODE = process.env.API_GATEWAY_DEV_MODE || 'development';
const logger = (0, api_gateway_logger_1.logInfo)();
const listenApiGatewayServer = () => {
    try {
        return app_1.app.listen(API_GATEWAY_PORT, () => {
            console.log(`API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`);
            logger.info(`API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`);
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
