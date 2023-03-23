"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shippingRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.shippingRouter = express_1.default.Router();
const shipping_controller_1 = require("../controllers/shipping-controller");
exports.shippingRouter.route('/').get(shipping_controller_1.fetchShippingDetails).post(shipping_controller_1.createNewShipping).delete(shipping_controller_1.deleteShippingDetails);
exports.shippingRouter.route('/:id').get(shipping_controller_1.fetchShippingDetailsByID).put(shipping_controller_1.editShippingDetails).delete(shipping_controller_1.deleteShippingDetails);
exports.shippingRouter.route('/:id/update-status').put(shipping_controller_1.editShippingStatus);
