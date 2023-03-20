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
exports.startAuthServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '/Users/sabin2000/Documents/TechRUs/backend/services/authentication/config.env' });
const app_1 = require("./app");
const auth_db_1 = require("./database/auth-db");
(0, auth_db_1.connectAuthDatabase)();
const AUTH_PORT = process.env.AUTH_PORT || 5400;
const AUTH_DEV_MODE = process.env.AUTH_DEV_MODE || 'development';
const startAuthServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return app_1.app.listen(AUTH_PORT, () => {
            console.log(`The Authentication Service Live On Port ${AUTH_PORT} in mode: ${process.env.NODE_ENV}`);
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
});
exports.startAuthServer = startAuthServer;
(0, exports.startAuthServer)(); // listen for requests on the API gateway server
