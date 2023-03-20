"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = void 0;
const winston_1 = __importDefault(require("winston"));
const logInfo = () => {
    const logger = winston_1.default.createLogger({
        level: 'info',
        format: winston_1.default.format.json(),
        defaultMeta: { service: 'authentication-service' },
        transports: [new winston_1.default.transports.File({ filename: './logs/error.log', level: 'error' }), new winston_1.default.transports.File({ filename: './logs/logs.txt' })]
    });
    return logger;
};
exports.logInfo = logInfo;
