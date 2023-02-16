"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenProductsServer = void 0;
require('dotenv').config();
const app_1 = require("./app");
const PRODUCT_SERVICE_PORT = process.env.PRODUCT_SERVICE_PORT || 5404;
const listenProductsServer = () => {
    try {
        return app_1.app.listen(PRODUCT_SERVICE_PORT, () => {
            console.log(`Product server listening for requests on port ${PRODUCT_SERVICE_PORT} in mode: ${process.env.PRODUCT_SERVICE_NODE_ENV}`);
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
};
exports.listenProductsServer = listenProductsServer;
(0, exports.listenProductsServer)();
