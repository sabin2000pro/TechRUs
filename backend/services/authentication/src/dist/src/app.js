"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = require("./routes/auth-routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// Mount middleware
if (process.env.NODE_ENV === 'development') { // If we are in development mode, use the morgan logger package
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}));
app.use((0, cookie_session_1.default)({
    keys: ["key1", 'key2']
}));
// Mount security middleware
app.use((0, xss_clean_1.default)());
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use('/api/auth', auth_routes_1.authRouter);
