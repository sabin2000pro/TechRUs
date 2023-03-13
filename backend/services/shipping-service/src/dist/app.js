"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const shipping_schema_1 = require("./schema/shipping-schema");
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
(0, shipping_schema_1.connectShippingSchema)();
app.use(express_1.default.json());
if (process.env.REVIEWS_NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}));
