"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.orderRouter = express_1.default.Router();
const orders_controller_1 = require("../controllers/orders-controller");
exports.orderRouter.route('/').get(orders_controller_1.fetchAllOrders).post(orders_controller_1.createNewOrder);
exports.orderRouter.route('/:id/update-status').put(orders_controller_1.updateOrderStatus);