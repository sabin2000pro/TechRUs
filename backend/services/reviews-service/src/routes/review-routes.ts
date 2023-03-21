import express, {Router} from 'express';
import { fetchAllReviews, createReview, editReviewByID, deleteReviewByID } from '../controllers/reviews-controllers';

export const reviewsRouter: Router = express.Router();

reviewsRouter.route('/').get(fetchAllReviews).post(createReview);
reviewsRouter.route('/:id').put(editReviewByID).delete(deleteReviewByID);

// Mount Routes Here