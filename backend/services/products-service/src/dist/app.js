"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const products_db_1 = require("./database/products-db");
const product_routes_1 = require("./routes/product-routes");
const app = (0, express_1.default)();
exports.app = app;
(0, products_db_1.connectProductsSchema)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
if (process.env.PRODUCTS_DEV_MODE === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, cors_1.default)({
    origin: '*',
    methods: ["POST", 'GET', "DELETE", "PUT", "PATCH"]
}));
app.use('/api/v1/products', product_routes_1.productRouter); // Mount the products router
