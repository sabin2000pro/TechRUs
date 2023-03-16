"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const api_gateway_routes_1 = require("./routes/api-gateway-routes");
const app = (0, express_1.default)();
exports.app = app;
if (process.env.API_GATEWAY_DEV_MODE === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use('/api/v1/api-gateway', api_gateway_routes_1.apiGatewayRouter);
