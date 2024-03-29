"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controllers_1 = require("../controllers/reviews-controllers");
exports.reviewsRouter = express_1.default.Router();
exports.reviewsRouter.route('/').get(reviews_controllers_1.fetchAllReviews).post(reviews_controllers_1.createReview).delete(reviews_controllers_1.deleteReviews);
exports.reviewsRouter.route('/:id').get(reviews_controllers_1.fetchReviewByID).put(reviews_controllers_1.editReviewByID).delete(reviews_controllers_1.deleteReview);
