import { generateOTPCode } from './../utils/generate-otp-code';
import {Customer} from '../models/customer-model';
import {Request, Response, NextFunction} from 'express';
import {TwoFactor} from '../models/two-factor-model';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import {ErrorResponse} from '../utils/error-response';
import { BadRequestError } from '../middleware/error-handler';

export const verifyCustomerExists = async (email: any): Promise<any> => {
    return await Customer.findOne({email});
}

export const rootRoute = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Root Route Auth!"});
})

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
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Customer Already exists with that e-mail address"});
        }

        const currentCustomer = await Customer.create({username, email, password, role, contactPhone, postalCode, country, address, region, points});
        const token = currentCustomer.fetchAuthToken(); // Get the JWT Token
        await currentCustomer.save();

        // Generate the OTP
        const customerOTP = generateOTPCode();
        const customerVerification = new TwoFactor({owner: currentCustomer._id, mfaToken: customerOTP});
        await customerVerification.save();

        // Create the e-mail transporter to send the MFA token to the user's e-mail address

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
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }


})

export const loginUser = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {email, password} = request.body;

        if(!email || !password) {
            return next(new BadRequestError(`Missing e-mail address or password. Check entries`, StatusCodes.BAD_REQUEST));
        }
    
        const customer = await Customer.findOne({email}).select("+password");

        if(!customer) {
            return next(new BadRequestError(`Could not find that customer`, StatusCodes.BAD_REQUEST));
        }

        // Check if the passwords match
        const passwordsMatch = await customer.comparePasswords(password);

        console.log(`Passwords match : `, passwordsMatch);

        if(!passwordsMatch) {
            return response.status(StatusCodes.OK).json({success: false, message: "Passwords do not match. Try again"});
        }

        const token = customer.fetchAuthToken();
        const loginToken = generateOTPCode();

        console.log(`Login MFA token : `, loginToken);
        
        request.session = {token};
        return response.status(StatusCodes.OK).json({success: true, customer, token});
    } 
    
    catch(error) {

        if(error) {
            console.error(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }

})

export const logoutUser = asyncHandler(async (request: any, response: Response, next): Promise<any> => {

    try {
        request.session = null;
    } 
    
    catch(error) {
        
        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }  


})

export const verifyLoginMFA = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {userId, mfaCode} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }


})

export const forgotPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {currentEmail} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }

})

export const updatePassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const {currentPassword, newPassword} = request.body;
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }


})

export const resetPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
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