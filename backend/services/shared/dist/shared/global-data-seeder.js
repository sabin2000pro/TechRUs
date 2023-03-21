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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var shipping_schema_1 = require("./../shipping-service/src/schema/shipping-schema");
var reviews_schema_1 = require("./../reviews-service/src/database/reviews-schema");
var coupons_schema_1 = require("./../coupons-service/src/database/coupons-schema");
var auth_schema_1 = require("../authentication-service/src/database/auth-schema");
var products_db_1 = require("./../products-service/src/database/products-db");
var orders_schema_1 = require("../orders-service/src/database/orders-schema");
var payments_schema_1 = require("../payments-service/src/database/payments-schema");
var user_model_1 = require("../authentication-service/src/models/user-model");
var products_model_1 = require("../products-service/src/model/products-model");
var coupon_model_1 = require("../coupons-service/src/model/coupon-model");
var order_model_1 = require("../orders-service/src/model/order-model");
var payment_model_1 = require("../payments-service/src/models/payment-model");
var shipping_model_1 = require("../shipping-service/src/model/shipping-model");
var users_json_1 = __importDefault(require(".././authentication-service/src/data/users.json"));
var products_json_1 = __importDefault(require("../products-service/src/data/products.json"));
var orders_json_1 = __importDefault(require("../orders-service/src/data/orders.json"));
var payments_json_1 = __importDefault(require("../payments-service/src/data/payments.json"));
var coupons_json_1 = __importDefault(require("../coupons-service/src/data/coupons.json"));
var shipping_json_1 = __importDefault(require("../shipping-service/src/data/shipping.json"));
// Import the load schemas functions
var connectServiceSchemas = function () {
    (0, auth_schema_1.connectAuthDatabase)();
    (0, products_db_1.connectProductsSchema)();
    (0, shipping_schema_1.connectShippingSchema)();
    (0, orders_schema_1.connectOrdersSchema)();
    (0, coupons_schema_1.connectCouponsSchema)();
    (0, reviews_schema_1.connectReviewSchema)();
    (0, payments_schema_1.connectPaymentsSchema)();
};
connectServiceSchemas();
// Functions to import and remove data
var importServiceData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                // First delete the existing data
                return [4 /*yield*/, user_model_1.User.deleteMany()];
            case 1:
                // First delete the existing data
                _a.sent();
                return [4 /*yield*/, products_model_1.Product.deleteMany()];
            case 2:
                _a.sent();
                return [4 /*yield*/, order_model_1.Order.deleteMany()];
            case 3:
                _a.sent();
                return [4 /*yield*/, coupon_model_1.Coupon.deleteMany()];
            case 4:
                _a.sent();
                return [4 /*yield*/, user_model_1.User.insertMany(users_json_1.default)];
            case 5:
                _a.sent();
                return [4 /*yield*/, products_model_1.Product.insertMany(products_json_1.default)];
            case 6:
                _a.sent();
                return [4 /*yield*/, order_model_1.Order.insertMany(orders_json_1.default)];
            case 7:
                _a.sent();
                return [4 /*yield*/, payment_model_1.Payment.insertMany(payments_json_1.default)];
            case 8:
                _a.sent();
                return [4 /*yield*/, shipping_model_1.Shipping.insertMany(shipping_json_1.default)];
            case 9:
                _a.sent();
                return [4 /*yield*/, coupon_model_1.Coupon.insertMany(coupons_json_1.default)];
            case 10:
                _a.sent();
                console.log("All data inserted to each service schema successfully");
                return [2 /*return*/, process.exit(1)];
            case 11:
                error_1 = _a.sent();
                if (error_1) {
                    console.error(error_1);
                    process.exit(1);
                }
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
// Function to remove all the service data from their schema
var removeServiceData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, user_model_1.User.deleteMany()];
            case 1:
                _a.sent();
                return [4 /*yield*/, products_model_1.Product.deleteMany()];
            case 2:
                _a.sent();
                return [4 /*yield*/, order_model_1.Order.deleteMany()];
            case 3:
                _a.sent();
                return [4 /*yield*/, shipping_model_1.Shipping.deleteMany()];
            case 4:
                _a.sent();
                return [4 /*yield*/, payment_model_1.Payment.deleteMany()];
            case 5:
                _a.sent();
                return [4 /*yield*/, coupon_model_1.Coupon.deleteMany()];
            case 6:
                _a.sent();
                console.log("All data removed from each service schema successfully");
                return [2 /*return*/, process.exit(1)];
            case 7:
                error_2 = _a.sent();
                if (error_2) {
                    return [2 /*return*/, console.error(error_2)];
                }
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
if (process.argv[2] === '--import') {
    importServiceData();
}
if (process.argv[2] === '--remove') {
    removeServiceData();
}
