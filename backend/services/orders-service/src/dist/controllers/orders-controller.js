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
exports.deleteSingleOrderByID = exports.deleteOrders = exports.updateOrderStatus = exports.createNewOrder = exports.fetchSingleOrderByID = exports.fetchAllOrders = void 0;
const mongoose_1 = require("mongoose");
const error_response_1 = require("../utils/error-response");
const order_model_1 = require("../model/order-model");
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @description: Fetches all the orders from the orders database
// @method: GET
// @route: /api/v1/orders
// @access: No Auth Token Required
exports.fetchAllOrders = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ordersPerPage = 3;
    const totalOrders = yield order_model_1.Order.countDocuments({});
    const currentPage = parseInt(request.query.page) || 1;
    const searchKeyword = request.query.keyword;
    const orders = yield order_model_1.Order.find(Object.assign({}, searchKeyword)); // Fetch all the orders
    if (!orders) {
        return next(new error_response_1.ErrorResponse(`Could not find any orders in the database`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, orders, totalOrders });
}));
exports.fetchSingleOrderByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    let order = yield order_model_1.Order.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`No order found with that ID`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!order) {
        return next(new error_response_1.ErrorResponse(`No order found with ID : ${id}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, order });
}));
exports.createNewOrder = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, orderItems, shippingInformation, orderStatus, paymentInformation, itemPrice, taxPrice, shippingPrice, totalPrice } = request.body;
    // Validate the request body before creating a new instance of order
    if (!orderItems || !shippingInformation || !itemPrice || !taxPrice || !shippingPrice || !totalPrice) {
        return next(new error_response_1.ErrorResponse(`Some order fields are missing. Please check your entries`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const order = yield order_model_1.Order.create({ user, orderItems, shippingInformation, orderStatus, paymentInformation, itemPrice, taxPrice, shippingPrice, totalPrice });
    yield order.save(); // Asynchronously save the order into the database
    return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, order, message: "We have received your order" });
}));
exports.updateOrderStatus = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderStatus } = request.body; // Extract the order status from the request body
    const id = request.params.id;
    let order = yield order_model_1.Order.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`The order ID is invalid. Try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!order) {
        return next(new error_response_1.ErrorResponse(`No order found with ID : ${id}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if ((order === null || order === void 0 ? void 0 : order.orderStatus) === 'completed' || (order === null || order === void 0 ? void 0 : order.orderStatus) === 'canceled' || (order === null || order === void 0 ? void 0 : order.orderStatus) === 'refunded') { // Before updating the order status, make sure it has not alreayd been delivered
        return next(new error_response_1.ErrorResponse(`One or more orders have been either completed, canceled or refunded. Cannot modify the order status`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    order = yield order_model_1.Order.findByIdAndUpdate(id, orderStatus, { new: true, runValidators: true });
    order.orderStatus = orderStatus;
    yield order.save();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Order Updated", order });
}));
exports.deleteOrders = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.Order.deleteMany();
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, mesage: "Orders deleted successfully" });
}));
exports.deleteSingleOrderByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`Order with ID : ${id} - does not exist`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    yield order_model_1.Order.findByIdAndDelete(id);
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "Order deleted" });
}));
