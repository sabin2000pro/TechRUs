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
exports.connectProductsSchema = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const PRODUCTS_SERVICE_DB_URI = process.env.PRODUCTS_SERVICE_DB_URI || "";
const connectProductsSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield mongoose_1.default.connect(PRODUCTS_SERVICE_DB_URI).then(conn => {
            if (conn.connection) {
                return console.log(`Connected to the products database schema successfully`);
            }
            else {
                return console.log(`Could not connect to the products database schema`);
            }
        });
    }
    catch (error) {
        if (error) {
            return console.log(error);
        }
    }
});
exports.connectProductsSchema = connectProductsSchema;
