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
describe("Register Unit Tests", () => {
    it("Register API with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
        const validRegisterData = [{ username: "testuser09", email: "testusre09@gmail.com", password: "123mini123" }];
        for (const body of validRegisterData) {
            const response = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
        }
    }));
    it("Register API with missing username", () => __awaiter(void 0, void 0, void 0, function* () {
        const validRegisterData = [{ email: "testusre09@gmail.com", password: "123mini123" }];
        for (const body of validRegisterData) {
            const response = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
    it("Register with missing e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const validRegisterData = [{ username: "user092", password: "123mini123" }];
        for (const body of validRegisterData) {
            const response = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
    it("Register API with invalid e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
        const validRegisterData = [{ username: "user092", email: "nfj", password: "123mini123" }];
        for (const body of validRegisterData) {
            const response = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/register`).send(body);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }));
});
describe("Login API Unit Tests", () => {
    it("Login with valid details", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginPayload = [{ email: "mike99@gmail.com", password: "123mini123" }];
        for (const body of loginPayload) {
            const loginResponse = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/login`).send(body);
            return expect(loginResponse.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
        }
    }));
    it("Login with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginPayload = [{ email: "mike99@gmail.com", password: "bb00" }];
        for (const body of loginPayload) {
            const loginResponse = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/login`).send(body);
            return expect(loginResponse.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
        }
    }));
    it("Login with missing password", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Login with missing e-mail address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
describe("Forgot Password API - Unit Tests", () => {
    it("Forgot Password - Valid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
        const forgotPasswordPayload = [{ email: "testuser09@gmail.com" }];
        for (const body of forgotPasswordPayload) {
            const response = yield (0, supertest_1.default)(app_1.app).post(`/api/v1/auth/forgot-password`).send(body);
            return expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.OK);
        }
    }));
    it("Forgot Password - Invalid E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Forgot Password - Missing E-mail Address", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
// Close the connection to the server after all tests are ran
afterAll(done => {
    mongoose_1.default.connection.close();
    done();
});
