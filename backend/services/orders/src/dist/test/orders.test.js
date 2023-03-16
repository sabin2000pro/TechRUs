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
require('dotenv').config();
const http_status_codes_1 = require("http-status-codes");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
// Establish connection to the authentication service database before running all the tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@techrus-auth-schema.mfj4iaa.mongodb.net/?retryWrites=true&w=majority");
}));
describe("Create New Order Test Suite", () => {
    it("Create order with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const orderTestPayload = {
            customer: "customer_id",
            shippingInformation: {
                address: "144 High Road",
                city: "Edinburgh",
                phoneNo: "07881391091",
                postalCode: "EH16 7AB",
                country: "United Kingdom"
            },
            orderItems: [{
                    name: "iPad Pro 12.9",
                    quantity: 1,
                    image: "no-photo.jpg",
                    price: 3999.99,
                    product: "63e25f48d82eb035f7da0982",
                    _id: "63f388bf2b02ac6637b871bc"
                }],
            orderStatus: "received",
            paymentInformation: {
                id: "payment_id",
                status: "received"
            },
            itemPrice: 3999.99,
            taxPrice: 4.99,
            shippingPrice: 2.99,
            totalPrice: 4006.99
        };
        const orderBodyPayload = [orderTestPayload];
        for (const orderData of orderBodyPayload) {
            const response = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/orders`).send(orderData);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
        }
    }));
    it("Fetch all orders unit test", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, supertest_1.default)(app_1.app).get(`/api/v1/orders`).send();
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
        }
        catch (error) {
            if (error) {
                return console.error(error);
            }
        }
    }));
    it("Update order status unit test", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateOrderStatusPayload = { orderStatus: "" };
    }));
    it("Create order with invalid data", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
