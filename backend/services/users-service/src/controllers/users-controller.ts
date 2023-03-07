import { ErrorResponse } from '../utils/error-response';
import { isValidObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { User } from "../model/user-model";
import {Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

export const fetchAllUsers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const users = await User.find();
    return response.status(StatusCodes.OK).json({success: true, users});
})

export const fetchUserByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
       const id = request.params.id;
       const user = await User.findById(id);
       return response.status(StatusCodes.OK).json({success: true, user});
})

export const editUserByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    let user = await User.findById(id);
    const userFieldsToUpdate = {username: request.body.username, email: request.body.email}

    if(!isValidObjectId(id)) {
       return next(new ErrorResponse(`No user found with that ID`, StatusCodes.BAD_REQUEST));
    }

    user = await User.findByIdAndUpdate(id, userFieldsToUpdate, {new: true, runValidators: true});
    return response.status(StatusCodes.OK).json({success: true, isUpdated: true, user});

})

export const deleteAllUsers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    await User.deleteMany();
    return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "All users deleted"})
})

export const deleteUserByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    await User.findByIdAndDelete(id);
    return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "User Deleted"});

})

export const editStaffUserShifts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    const {startShiftDate, endShiftDate} = request.body;
    const id = request.params.id;
    const fieldsToUpdate = {startShiftDate, endShiftDate}

    let user = await User.findById(id);

    if(!user) {
        return next()
    }

    user = await User.findByIdAndUpdate(id, fieldsToUpdate, {new: true, runValidators: true});
    await user!.save();
    return response.status(StatusCodes.OK).json({success: true, user, isUpdated: true});
})