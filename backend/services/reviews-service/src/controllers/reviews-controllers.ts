import { isValidObjectId } from 'mongoose';
import { ErrorResponse } from '../utils/error-response';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import {Response, NextFunction} from 'express';
import { Review } from '../model/review-model';

export const fetchAllReviews = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const reviews = await Review.find();

    if(!reviews) {
      return next(new ErrorResponse(`No reviews found`, StatusCodes.BAD_REQUEST));
    }


    return response.status(StatusCodes.OK).json({success: true, reviews});
})

export const fetchReviewByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    const review = await Review.findById(id);

    if(!isValidObjectId(id)) {
       return next(new ErrorResponse(`The Review ID is invalid`, StatusCodes.BAD_REQUEST));
    }

    if(!review) {
        return next(new ErrorResponse(`No review found with that ID : ${id}`, StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, review});
})

export const createReview = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    const {product, title, rating, comment} = request.body;

    if(!rating || !comment || !title) {
      return next(new ErrorResponse(`No rating or comment found, please try again`, StatusCodes.BAD_REQUEST));
    }

    const review = await Review.create({product, rating, title, comment});
    await review.save();

    return response.status(StatusCodes.CREATED).json({success: true, review});

})

export const editReviewByID = asyncHandler(async (request, response: Response, next: NextFunction): Promise<any> => {

    const reviewFieldsToUpdate = {rating: request.body.rating, comment: request.body.comment}
    const id = request.params.id;
    let review = await Review.findById(id);

    if(!isValidObjectId(id)) {
       return next(new ErrorResponse(`Review ID you provided is invalid. Please try again`, StatusCodes.BAD_REQUEST));
    }

    if(!review) {
       return next(new ErrorResponse(`No review found with ID : ${request.params.id}`, StatusCodes.BAD_REQUEST));
    }

    review = await Review.findByIdAndUpdate(id, reviewFieldsToUpdate, {new: true, runValidators: true});

    review.rating = request.body.rating;
    review.comment = request.body.comment;

    await review.save(); // Save the review after updating the fields

    return response.status(StatusCodes.OK).json({success: true, message: "Review Updated"});
})

export const deleteReview = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    await Review.findByIdAndDelete(id);

    return response.status(StatusCodes.OK).json({success: true, message: "Review Deleted"})
})

export const deleteReviews = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    await Review.deleteMany();
    return response.status(StatusCodes.NO_CONTENT)
})