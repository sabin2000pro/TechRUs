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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startOrdersServer = void 0;
require('dotenv').config();
const app_1 = require("./app");
const ORDERS_SERVICE_PORT = process.env.ORDERS_SERVICE_PORT || 5403;
// Start of authentication server
const startOrdersServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return app_1.app.listen(ORDERS_SERVICE_PORT, () => {
            console.log(`Orders Service Service Server is listening for requests on port ${ORDERS_SERVICE_PORT} in mode: ${process.env.ORDERS_SERVICE_DEV_MODE}`);
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
});
exports.startOrdersServer = startOrdersServer;
(0, exports.startOrdersServer)();
