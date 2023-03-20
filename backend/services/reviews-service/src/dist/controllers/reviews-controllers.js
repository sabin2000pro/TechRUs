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
exports.deleteReviewByID = exports.editReviewByID = exports.createReview = exports.fetchReviewByID = exports.fetchAllReviews = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const review_model_1 = require("../model/review-model");
exports.fetchAllReviews = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, reviews });
}));
exports.fetchReviewByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const review = yield review_model_1.Review.findById(id);
}));
exports.createReview = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = request.body;
    if (!rating || !comment) {
    }
}));
exports.editReviewByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewFieldsToUpdate = { rating: request.body.rating, comment: request.body.comment };
    const id = request.params.id;
    let review = yield review_model_1.Review.findById(id);
    if (!review) {
    }
    review = yield review_model_1.Review.findByIdAndUpdate(id);
}));
exports.deleteReviewByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Delete Review By ID" });
}));