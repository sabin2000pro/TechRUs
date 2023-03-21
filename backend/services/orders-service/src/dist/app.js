"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const orders_schema_1 = require("./database/orders-schema");
const error_handler_1 = require("./middleware/error-handler");
const order_routes_1 = require("./routes/order-routes");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
(0, orders_schema_1.connectOrdersSchema)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ["POST", "GET", 'DELETE', "PATCH", "PUT"]
}));
if (process.env.ORDERS_SERVICE_DEV_MODE === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use('/api/v1/orders', order_routes_1.orderRouter);
app.use(error_handler_1.errorHandler);
