import User from '../models/customer-model';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
const {ErrorResponse} = require('../utils/error-response');
const { generateOTPCode } = require('../utils/generate-otp-code');

export const verifyUserExists = async (email: any): Promise<any> => {
    return await User.findOne({email});
}

module.exports.sendResetPasswordTokenStatus = async (request, response, next) => {
    return response.status(StatusCodes.OK).json({isTokenValid: true})
}

export const registerUser = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {username, email, password, role, zipcode, country, phone} = request.body;

        if(!username || !email || !password || !role || !zipcode || !country || !phone) {
            return next(new ErrorResponse(`Some of the fields are missing, please try again`, StatusCodes.BAD_REQUEST));
        }

        if(await verifyUserExists(email)) { // If the user already exists
            return next(new ErrorResponse('The user with that e-mail address already exists in our server', StatusCodes.BAD_REQUEST));
        }

        const user = await User.create({username, email, password, role, zipcode, country});
        const token = user.fetchAuthToken(); // Get the signed JSON Web Token

        return response.status(StatusCodes.CREATED).json({success: true, user, token});
    } 
    
    catch(error) {

        if(error) {
            return next(error);
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

export const loginUser = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {email, password} = request.body;

        if(!email || !password) {
            return next(new BadRequestError(`Missing e-mail address or password. Check entries`, StatusCodes.BAD_REQUEST));
        }
    
        const user = await User.findOne({email});

        if(!user) {
            return next(new BadRequestError(`Could not find that user`, StatusCodes.BAD_REQUEST));
        }

        // Check if the passwords match
        const passwordsMatch = await user.comparePasswords(password);

        if(!passwordsMatch) {
            return next(new ErrorResponse(`Passwords invalid, please try again`, StatusCodes.BAD_REQUEST));
        }

        const token = user.getAuthToken();
        request.session = {token};
        return response.status(StatusCodes.OK).json({success: true, user, token});
        
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }

})

module.exports.logout = asyncHandler(async (request, response, next) => {

    try {

        request.session = null;
    } 
    
    catch(error) {
        
        if(error) {
            return next(error);
        }

    }  


})

module.exports.verifyLoginMFA = asyncHandler(async (request, response, next) => {

    try {
        const {userId, mfaCode} = request.body;
    } 
    
    catch(error) {

    }


})

module.exports.forgotPassword = asyncHandler(async (request, response, next) => {
    try {

    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }

})

module.exports.updatePassword = asyncHandler(async (request, response, next) => {

    try {
        const {currentPassword, newPassword} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }

    }


})

module.exports.resetPassword = asyncHandler(async (request, response, next) => {
    try {

    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }


    }

})

module.exports.fetchLoggedInUser = asyncHandler(async (request, response, next) => {

    try {
        const user = request.user; // Store the user in the user object
    } 
    
    catch(error) {
        if(error) {
            return next(error);
        }
    }

})