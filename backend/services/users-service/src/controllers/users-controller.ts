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

export const createNewUser = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
       const {} = request.body;
       const customer = await User.create();
})

export const editCustomerByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
})

export const deleteAllUsers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    await User.deleteMany();
})

export const deleteUserByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

})

export const editStaffUserShifts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    const {startShiftDate, endShiftDate} = request.body;
    const customerId = request.params.customerId;
    const fieldsToUpdate = {startShiftDate, endShiftDate}

    let user = await User.findById(customerId);

    if(!user) {
      
    }

    user = await User.findByIdAndUpdate(customerId, fieldsToUpdate, {new: true, runValidators: true});
    await user!.save();
    return response.status(StatusCodes.OK).json({success: true, user});
})

export const uploadUserAvatar = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
   
})


export const fetchPopularUsers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    
})