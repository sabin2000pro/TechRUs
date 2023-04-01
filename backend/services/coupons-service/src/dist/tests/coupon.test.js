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
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    return yield mongoose_1.default.connect("mongodb+srv://sabin2000:123mini123@techrus-coupons-schema.irvhiwg.mongodb.net/?retryWrites=true&w=majority");
}));
describe("Fetch Valid Coupons Unit Tests", () => {
    it("Fetch Valid Coupons - Unit Test 1", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Create New Coupon - Missing Data", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Create New Coupon - Expired Coupon", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Edit Coupon Details - Valid Coupon Data", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it("Edit Coupon Details - Editing expired coupon test", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
