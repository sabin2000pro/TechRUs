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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const payment_routes_1 = require("./routes/payment-routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}));
app.get('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Payments Service Root Route" });
    }
    catch (error) {
        if (error) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
        }
    }
}));
app.use('/api/v1/payments', payment_routes_1.paymentRouter); // Mount the payment routes as middleware
