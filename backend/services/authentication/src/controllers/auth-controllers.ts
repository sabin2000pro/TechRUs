import { generateOTPCode } from './../utils/generate-otp-code';
import {Customer} from '../models/customer-model';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import {ErrorResponse} from '../utils/error-response';
import { BadRequestError } from '../middleware/error-handler';

export const verifyCustomerExists = async (email: any): Promise<any> => {
    return await Customer.findOne({email});
}

export const sendResetPasswordTokenStatus = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({isTokenValid: true})
}

export const registerUser = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

    try {

        const {username, email, password, role, postalCode, country, contactPhone, address, region, points} = request.body;

        if(!username || !email || !password || !role || !postalCode || !country || !contactPhone) {
            return next(new ErrorResponse(`Some of the fields are missing, please try again`, StatusCodes.BAD_REQUEST));
        }

        if(await verifyCustomerExists(email)) { // If the user already exists
            return next(new ErrorResponse('The user with that e-mail address already exists in our server', StatusCodes.BAD_REQUEST));
        }

        const currentCustomer = await Customer.create({username, email, password, role, contactPhone, postalCode, country, address, region, points});
        const token = currentCustomer.fetchAuthToken();

        return response.status(StatusCodes.CREATED).json({success: true, currentCustomer, token});
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }
        
    }

})

export const verifyEmailAddress = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {userId, OTP} = request.body; // Extract the user id and OTP from the request body

        if(!isValidObjectId(userId)) {
            return next(new ErrorResponse("The User ID is invalid. Please verify it again", StatusCodes.BAD_REQUEST));
        }

        if(OTP === null) { // If there is no OTP present
           return next(new ErrorResponse("OTP is invalid, please check it again", StatusCodes.BAD_REQUEST));
        } 

        const otp = generateOTPCode(); // Get the generated e-mail verification code
        
        return response.status(StatusCodes.OK).json({success: true, message: "User e-mail verified"})
    } 
    
    catch(error) {
        
        if(error) {
            return next(error);
        }

    }


})

export const loginUser = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {email, password} = request.body;
        let session = request.session;

        if(!email || !password) {
            return next(new BadRequestError(`Missing e-mail address or password. Check entries`, StatusCodes.BAD_REQUEST));
        }
    
        const customer = await Customer.findOne({email});

        if(!customer) {
            return next(new BadRequestError(`Could not find that user`, StatusCodes.BAD_REQUEST));
        }

        // Check if the passwords match
        const passwordsMatch = await customer.comparePasswords(password);

        if(!passwordsMatch) {
            return next(new ErrorResponse(`Passwords invalid, please try again`, StatusCodes.BAD_REQUEST));
        }

        const token = customer.fetchAuthToken();
        session = {token};
        return response.status(StatusCodes.OK).json({success: true, customer, token});
        
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }

})

export const logoutUser = asyncHandler(async (request: any, response: Response, next): Promise<any> => {

    try {
        request.session = null;
    } 
    
    catch(error) {
        
        if(error) {
            return next(error);
        }

    }  


})

export const verifyLoginMFA = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {userId, mfaCode} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }


})

export const forgotPassword = asyncHandler(async (request: any, respons: Response, next: NextFunction): Promise<any> => {

    try {
        const {currentEmail} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }

})

export const updatePassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {currentPassword, newPassword} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }


})

export const resetPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }


    }

})

export const fetchLoggedInUser = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const user = request.user; // Store the user in the user object
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }
        
    }

})