import { EmailVerification } from './../models/verify-email-model';
import { createEmailTransporter } from './../utils/send-mail';
import {generateCode } from './../utils/generate-otp-code';
import {Customer} from '../models/customer-model';
import {Request, Response, NextFunction} from 'express';
import {TwoFactor} from '../models/two-factor-model';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import {ErrorResponse} from '../utils/error-response';
import 
import { BadRequestError } from '../middleware/error-handler';

export const verifyCustomerExists = async (email: any): Promise<any> => {
    return await Customer.findOne({email});
}

  // @description: Sends the verify confirmation e-mail to the user after registering an account
  // @parameters: Transporter Object, User Object, Randomly Generated User OTP
  // @returns: void
  // @public: True (No Authorization Required)

  export const sendEmailConfirmationEmail = (transporter: any, newCustomer: any, customerOTP: number) => {

    return transporter.sendMail({

        from: 'verification@techrus.com',
        to: newCustomer.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${customerOTP}</h1>

        `
    })
}

export const rootRoute = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Root Route Auth!"});
})

export const sendLoginMfa = (transporter: any, customer: any, customerMfa: any) => {

    return transporter.sendMail({
        from: 'mfa@techrus.com',
        to: customer.email,
        subject: 'Login MFA Verification',
        html: `
        
        <p>Your MFA code</p>
        <h1> ${customerMfa}</h1>
        `
    })


}

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

        const customerOTP = generateOTPCode();  // Generate the OTP

        const customerVerification = new TwoFactor({owner: currentCustomer._id, mfaToken: customerOTP});
        await customerVerification.save();

        // Create the e-mail transporter to send the MFA token to the user's e-mail address
        const emailTransporter = createEmailTransporter();
        sendEmailConfirmationEmail(emailTransporter, currentCustomer, customerOTP as unknown as any);

        const userOTPVerification = new EmailVerification({owner: currentCustomer._id, otpToken: customerOTP});
        await userOTPVerification.save(); // Save the User OTP token to the database after creating a new instance of OTP

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

        const {customerId, OTP} = request.body; // Extract the user id and OTP from the request body
        const currentCustomer = await Customer.findById(customerId);

        if(!isValidObjectId(customerId)) {
            return next(new ErrorResponse("The Customer ID is invalid. Please verify it again", StatusCodes.BAD_REQUEST));
        }

        if(!OTP) { // If there is no OTP present
           return next(new ErrorResponse("OTP is invalid, please check it again", StatusCodes.BAD_REQUEST));
        } 

        if(!currentCustomer) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: `Customer that ID ${customerId} does not exist`});
        }

        return response.status(StatusCodes.OK).json({success: true, message: "User e-mail verified"})
    } 
    
    catch(error) {
        
        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }


})

export const resendEmailVerificationCode = asyncHandler (async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {customerId, OTP} = request.body;
        const currentCustomer = await Customer.findById(customerId);

        if(!currentCustomer) { // If we have no current user
            return next(new BadRequestError("Current user does not exist. Check user again", StatusCodes.BAD_REQUEST));
        }

        if(!isValidObjectId(customerId)) {
            return next(new BadRequestError("Owner ID invalid. Check again", StatusCodes.BAD_REQUEST));
        }

        if(!OTP) {
            
        }

        const token = await EmailVerification.findOne({owner: customerId});

        if(!token) {
            return next(new BadRequestError("User verification token not found", StatusCodes.BAD_REQUEST));
        }

        // Fetch the generated token
        const otpToken = generateOTPCode(); 

        if(!otpToken) {
            return next(new BadRequestError("OTP Token generated is invalid.", StatusCodes.BAD_REQUEST));
        }

        const newToken = await EmailVerification.create({owner: currentCustomer, token: otpToken}); // Create a new instance of the token
        await newToken.save(); // Save the new token
    
        return response.status(StatusCodes.OK).json({success: true, message: "E-mail Verification Re-sent"});
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

        const customerMfaToken = generateOTPCode();
        console.log(`Your Login MFA token : `, customerMfaToken);

        const transporter = createEmailTransporter();
        sendLoginMfa(transporter as any, customer as any, customerMfaToken as any);

        const loginMfa = await TwoFactor.create({owner: customer, mfaToken: customerMfaToken});
        await loginMfa.save();

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

        const {email} = request.body;
        const user = await Customer.findOne({email});

        // // Check if we have an e-mail in the body of the request
        if(!email) {
            return next(new ErrorResponse(`User with that e-mail not found`, StatusCodes.BAD_REQUEST))
        }
    
        if(!user) {
            return next(new ErrorResponse("No user found with that e-mail address", StatusCodes.NOT_FOUND));
        }
    
        const userHasResetToken = await PasswordReset.findOne({owner: customer._id});
    
        if(userHasResetToken) {
            return next(new ErrorResponse("User already has the password reset token", StatusCodes.BAD_REQUEST));
        }
    
        const token = generateCode();
    
        if(token === undefined) { // If no token exists
            return next(new ErrorResponse("Reset Password Token is invalid", StatusCodes.BAD_REQUEST));
        }
    
        const resetPasswordToken = await PasswordReset.create({owner: user._id, resetToken: token}); // Create an instance of the Password Reset model
        await resetPasswordToken.save();
    
        const resetPasswordURL = `http://localhost:3000/reset-password?token=${token}&id=${user._id}` // Create the reset password URL
        sendPasswordResetEmail(user, resetPasswordURL);
    
        return response.status(StatusCodes.OK).json({success: true, message: "Reset Password E-mail Sent", email });
        
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

export const fetchLoggedInCustomer = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const customer = request.customer; // Store the user in the user object
        return response.status(StatusCodes.OK).json({success: true, customer});
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }
        
    }

})