import { ErrorResponse } from '../utils/error-response';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import {Response, NextFunction} from 'express';
import { Review } from '../model/review-model';

export const fetchAllReviews = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const reviews = await Review.find();
    return response.status(StatusCodes.OK).json({success: true, reviews});
})

export const fetchReviewByID = asyncHandler(async (request, response, next) => {
    const id = request.params.id;
    const review = await Review.findById(id);
})

export const createReview = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {product, user} = request.query;
    const {rating, comment} = request.body;

    if(!rating || !comment) {
      return next(new ErrorResponse(`No rating or comment found, please try again`, StatusCodes.BAD_REQUEST));
    }

    const review = await Review.create({product, user, rating, comment});
    await review.save();

    return response.status(StatusCodes.CREATED).json({success: true, review});

})

export const editReviewByID = asyncHandler(async (request, response: Response, next: NextFunction) => {

    const reviewFieldsToUpdate = {rating: request.body.rating, comment: request.body.comment}
    const id = request.params.id;
    let review = await Review.findById(id);

    if(!review) {
       return next(new ErrorResponse(`No review found`, StatusCodes.BAD_REQUEST));
    }

    review = await Review.findByIdAndUpdate(id, )
})

export const deleteReviewByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Delete Review By ID"})
})