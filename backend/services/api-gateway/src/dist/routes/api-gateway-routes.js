"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGatewayRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.apiGatewayRouter = express_1.default.Router();
const api_gateway_controllers_1 = require("../controllers/api-gateway-controllers");
exports.apiGatewayRouter.route('/my-orders').get(api_gateway_controllers_1.fetchUserOrders);
