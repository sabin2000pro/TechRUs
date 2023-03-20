import express from 'express';
import { fetchAllReviews, createReview, editReviewByID } from '../controllers/reviews-controllers';
export const reviewsRouter = express.Router({mergeParams: true});

// Mount Routes Here