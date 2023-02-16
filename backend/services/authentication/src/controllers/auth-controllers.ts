import { createEmailTransporter } from './../utils/send-mail';
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

export const sendTokenResponse = (request: Express.Request, customer: any, statusCode: number, response: any): Promise<any> => {
    const token = customer.fetchAuthToken();
    request.session = {token}; // Store the token in the session
 
    return response.status(statusCode).json({customer, token});
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
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Customer Already exists with that e-mail address"});
        }

        const currentCustomer = await Customer.create({username, email, password, role, contactPhone, postalCode, country, address, region, points});
        await currentCustomer.save();

        // Generate the OTP
        const customerOTP = generateOTPCode();
        const customerVerification = new TwoFactor({owner: currentCustomer._id, mfaToken: customerOTP});
        await customerVerification.save();

        // Create the e-mail transporter to send the MFA token to the user's e-mail address
        const emailTransporter = createEmailTransporter();
        console.log(`E-mail Transporter`);

        return sendTokenResponse(request, currentCustomer, StatusCodes.CREATED, response);
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
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Missing e-mail address or password"});
        }
    
        const customer = await Customer.findOne({email}).select("+password");

        if(!customer) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No customer found with that e-mail address"});
        }

        // Check if the passwords match
        const passwordsMatch = await customer.comparePasswords(password);

        if(!passwordsMatch) {
            return response.status(StatusCodes.OK).json({success: false, message: "Passwords do not match. Try again"});
        }

        const loginToken = generateOTPCode();
        console.log(`Your Login MFA token : `, loginToken);

        return sendTokenResponse(request, customer, StatusCodes.CREATED, response);
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }

})

export const logoutUser = asyncHandler(async (request: any, response: Response, next): Promise<any> => {

    try {
        request.session = null;

        return response.status(StatusCodes.OK).json({success: true, message: "You have logged out successfully"})
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
        const customerLoginMfa = await TwoFactor.findById({owner: userId});
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
       const {currentPassword, newPassword} = request.body;
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
        return response.status(StatusCodes.OK).json({success: true, user});
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }
        
    }

})