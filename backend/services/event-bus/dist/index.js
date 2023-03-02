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
exports.startEventBusServer = void 0;
require('dotenv').config();
const app_1 = require("./app");
const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT || 6500;
const EVENT_BUS_DEV_MODE = process.env.EVENT_BUS_DEV_MODE || 'development';
// Start of authentication server
const startEventBusServer = () => __awaiter(void 0, void 0, void 0, function* () {
    return app_1.app.listen(EVENT_BUS_PORT, () => {
        console.log(`Event Bus Service Server is listening for requests on port ${EVENT_BUS_PORT} in mode: ${EVENT_BUS_DEV_MODE}`);
    });
});
exports.startEventBusServer = startEventBusServer;
(0, exports.startEventBusServer)();
