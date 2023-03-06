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
exports.startCustomersServer = void 0;
require('dotenv').config();
const app_1 = require("./app");
const CUSTOMERS_SERVICE_PORT = process.env.CUSTOMERS_SERVICE_PORT || 5420;
// Start of authentication server
const startCustomersServer = () => __awaiter(void 0, void 0, void 0, function* () {
    return app_1.app.listen(CUSTOMERS_SERVICE_PORT, () => {
        console.log(`Coupons Service Server is listening for requests on port ${CUSTOMERS_SERVICE_PORT} in mode: ${process.env.CUSTOMERS_DEV_MODE}`);
    });
});
exports.startCustomersServer = startCustomersServer;
(0, exports.startCustomersServer)();
