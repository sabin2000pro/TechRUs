"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPaymentsServer = void 0;
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env' });
const PAYMENTS_SERVICE_PORT = process.env.PAYMENTS_SERVICE_PORT || 5406;
const PAYMENTS_SERVICE_NODE_ENV = process.env.PAYMENTS_SERVICE_NODE_ENV || 'development';
const startPaymentsServer = () => {
    try {
        return app_1.app.listen(PAYMENTS_SERVICE_PORT, () => {
            console.log(`Payments Service server is listening for active requests on port ${PAYMENTS_SERVICE_PORT} in mode ${PAYMENTS_SERVICE_NODE_ENV}`);
        });
    }
    catch (error) {
        if (error) {
            console.error(error);
        }
    }
};
exports.startPaymentsServer = startPaymentsServer;
(0, exports.startPaymentsServer)();
