"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const http_status_codes_1 = require("http-status-codes");
const verify_user_auth_1 = require("../src/middleware/verify-user-auth");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middleware/error-handler");
const auth_routes_1 = require("./routes/auth-routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}));
app.use((0, cookie_session_1.default)({
    keys: ["key1", 'key2']
}));
app.get('/', verify_user_auth_1.verifyUserAuthentication, (request, response, next) => {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Auth Root Route" });
});
// Mount security middleware
app.use((0, xss_clean_1.default)());
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use('/api/auth', auth_routes_1.authRouter);
app.use(error_handler_1.errorHandler);
