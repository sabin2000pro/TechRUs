import express, {Router} from 'express';
import { fetchAllReviews, createReview, fetchReviewByID, editReviewByID, deleteReviewByID, deleteReviews } from '../controllers/reviews-controllers';

export const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(fetchAllReviews).post(createReview).delete(deleteReviews);
reviewsRouter.route('/:id').get(fetchReviewByID).put(editReviewByID).delete(deleteReviewByID);