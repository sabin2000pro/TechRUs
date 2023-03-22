import express, {Router} from 'express';
import { fetchAllReviews, createReview, fetchReviewByID, editReviewByID, deleteReviewByID } from '../controllers/reviews-controllers';

export const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(fetchAllReviews).post(createReview);
reviewsRouter.route('/:id').get(fetchReviewByID).put(editReviewByID).delete(deleteReviewByID);