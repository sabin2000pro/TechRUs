"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const cors = require('cors');
const app = (0, express_1.default)();
exports.app = app;
const { connectProductsSchema } = require('./database/products-db');
const productRoutes = require('./routes/product-routes');
connectProductsSchema();
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(cors({
    origin: '*',
    methods: ["POST", 'GET', "DELETE", "PUT", "PATCH"]
}));
app.use('/api/products', productRoutes);
