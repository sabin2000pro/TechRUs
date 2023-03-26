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
exports.deleteReviews = exports.deleteReview = exports.editReviewByID = exports.createReview = exports.fetchReviewByID = exports.fetchAllReviews = void 0;
const mongoose_1 = require("mongoose");
const error_response_1 = require("../utils/error-response");
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const review_model_1 = require("../model/review-model");
exports.fetchAllReviews = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find();
    if (!reviews) {
        return next(new error_response_1.ErrorResponse(`No reviews found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, reviews });
}));
exports.fetchReviewByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const review = yield review_model_1.Review.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`The Review ID is invalid`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!review) {
        return next(new error_response_1.ErrorResponse(`No review found with that ID : ${id}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, review });
}));
exports.createReview = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, title, rating, comment } = request.body;
    if (!product) {
        return next(new error_response_1.ErrorResponse(`Product for creating a review not found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!rating || !comment || !title) {
        return next(new error_response_1.ErrorResponse(`No rating or comment found, please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const review = yield review_model_1.Review.create({ product, rating, title, comment });
    yield review.save();
    return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, review });
}));
exports.editReviewByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewFieldsToUpdate = { rating: request.body.rating, comment: request.body.comment };
    const id = request.params.id;
    let review = yield review_model_1.Review.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`Review ID you provided is invalid. Please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!review) {
        return next(new error_response_1.ErrorResponse(`No review found with ID : ${request.params.id}`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    review = yield review_model_1.Review.findByIdAndUpdate(id, reviewFieldsToUpdate, { new: true, runValidators: true });
    review.rating = request.body.rating;
    review.comment = request.body.comment;
    yield review.save(); // Save the review after updating the fields
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Review Updated" });
}));
exports.deleteReview = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield review_model_1.Review.findByIdAndDelete(id);
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Review Deleted" });
}));
exports.deleteReviews = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield review_model_1.Review.deleteMany();
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT);
}));
