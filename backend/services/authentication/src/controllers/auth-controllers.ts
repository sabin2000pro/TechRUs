import { EmailVerification } from './../models/verify-email-model';
import { createEmailTransporter } from './../utils/send-mail';
import {generateCode } from './../utils/generate-otp-code';
import {Customer} from '../models/customer-model';
import {Request, Response, NextFunction} from 'express';
import {TwoFactorVerification} from '../models/two-factor-model';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import {ErrorResponse} from '../utils/error-response';
import {PasswordReset} from '../models/password-reset-model';
// import { BadRequestError } from '../middleware/error-handler';


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

export const sendForgotPasswordResetLink = (customer: any, resetPasswordURL: string) => {

    const transporter = createEmailTransporter();
     
   return transporter.sendMail({
        from: 'resetpassword@ethertix.com',
        to: customer.email,
        subject: 'Reset Password',
        html: `
        
        <h1> ${resetPasswordURL}</h1>
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

        const {username, email, password} = request.body;

        if(!username || !email || !password) {
            return next(new ErrorResponse(`Some of the fields are missing, please try again`, StatusCodes.BAD_REQUEST));
        }

        if(await verifyCustomerExists(email)) { // If the user already exists
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Customer Already exists with that e-mail address"});
        }

        const currentCustomer = await Customer.create({username, email, password});
        await currentCustomer.save();

        const customerOTP = generateCode();  // Generate the OTP

        const customerVerification = new TwoFactorVerification({owner: currentCustomer._id, mfaToken: customerOTP});
        await customerVerification.save();

        // Create the e-mail transporter to send the MFA token to the user's e-mail address
        const emailTransporter = createEmailTransporter();
        sendEmailConfirmationEmail(emailTransporter, currentCustomer, customerOTP as unknown as any);

        const customerOTPVerification = new EmailVerification({owner: currentCustomer._id, otpToken: customerOTP});
        console.log(`Your Customer OTP Verification`)
        await customerOTPVerification.save(); // Save the User OTP token to the database after creating a new instance of OTP

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
            return next(new ErrorResponse("Current user does not exist. Check user again", StatusCodes.BAD_REQUEST));
        }

        if(!isValidObjectId(customerId)) {
            return next(new ErrorResponse("Owner ID invalid. Check again", StatusCodes.BAD_REQUEST));
        }

        if(!OTP) {
            return next(new ErrorResponse(`No OTP found. Please try again`, StatusCodes.BAD_REQUEST))
        }

        const token = await EmailVerification.findOne({owner: customerId});

        if(!token) {
            return next(new ErrorResponse("User verification token not found", StatusCodes.BAD_REQUEST));
        }

        // Fetch the generated token
        const otpToken = generateCode(); 

        if(!otpToken) {
            return next(new ErrorResponse("OTP Token generated is invalid.", StatusCodes.BAD_REQUEST));
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

        const customerMfaToken = generateCode();

        const transporter = createEmailTransporter();
        sendLoginMfa(transporter as any, customer as any, customerMfaToken as any);

        const loginMfa = await TwoFactorVerification.create({owner: customer, mfaToken: customerMfaToken});
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
    const {customerId, multiFactorToken} = request.body;
    const customer = await Customer.findById(customerId);

    if(!isValidObjectId(customerId)) {
        return next(new ErrorResponse(`This user ID is not valid. Please try again`, StatusCodes.UNAUTHORIZED));
    }

    if(!multiFactorToken) {
        customer.isActive = false; // User is not active yet
        return next(new ErrorResponse("Please provide your MFA token", StatusCodes.BAD_REQUEST));
    }

    const factorToken = await TwoFactorVerification.findOne({owner: customerId});

    if(!factorToken) {
        return next(new ErrorResponse(`The 2FA token associated to the user is invalid `, StatusCodes.UNAUTHORIZED));
    }

    // Check to see if the tokens match
    const mfaTokensMatch = await factorToken.compareVerificationTokens(multiFactorToken as any);

    if(!mfaTokensMatch) { // If tokens don't match
        customer.isActive = (!customer.isActive)
        customer.isVerified = (!customer.isVerified)
        return next(new ErrorResponse("The MFA token you entered is invalid. Try again", StatusCodes.BAD_REQUEST));
    }

    const newToken = new TwoFactorVerification({owner: customer, mfaToken: multiFactorToken}); // Create a new instance of the token
    await newToken.save(); // Save the new token

    customer.isVerified = true; // User account is now verified
    customer.isActive = true; // And user account is active

    return response.status(StatusCodes.OK).json({customer, message: "Your account is now active"});
})

export const forgotPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const {email} = request.body;
        const customer = await Customer.findOne({email});

       // Check if we have an e-mail in the body of the request
        if(!email) {
            return next(new ErrorResponse(`User with that e-mail not found`, StatusCodes.BAD_REQUEST))
        }
    
        if(!customer) {
            return next(new ErrorResponse("No user found with that e-mail address", StatusCodes.NOT_FOUND));
        }
    
        const customerHasResetToken = await PasswordReset.findOne({owner: customer._id});
    
        if(customerHasResetToken) {
            return next(new ErrorResponse("User already has the password reset token", StatusCodes.BAD_REQUEST));
        }
    
        const token = generateCode();
    
        if(token === undefined) { // If no token exists
            return next(new ErrorResponse("Reset Password Token is invalid", StatusCodes.BAD_REQUEST));
        }
    
        const resetPasswordToken = await PasswordReset.create({owner: customer._id, resetToken: token}); // Create an instance of the Password Reset model
        await resetPasswordToken.save();

        const resetPasswordURL = `http://localhost:3000/reset-password?token=${token}&id=${customer._id}` // Create the reset password URL
        sendForgotPasswordResetLink(customer, resetPasswordURL); // Send the reset password e-mail to the customer
    
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

        if(!newPassword) {
            return next(new ErrorResponse("Please provide your new password", StatusCodes.BAD_REQUEST));
        }
    
        const customer = await Customer.findById(<any>request.user._id);
    
        if(!customer) {
            return next(new ErrorResponse("No user found", StatusCodes.BAD_REQUEST))
        }
    
        const currentPasswordMatch = customer.comparePasswords(currentPassword);
    
        if(!currentPasswordMatch) { // If passwords do not match
            return next(new ErrorResponse("Current password is invalid.", StatusCodes.BAD_REQUEST))
        }
    
        customer.password = request.body.newPassword
        await customer.save(); // Save new user
    
        return response.status(StatusCodes.OK).json({success: true, message: "Customer Password Updated"});
    } 
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }

    }

})

export const resetPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const currentPassword = request.body.currentPassword;
        const newPassword = request.body.newPassword;
        const resetToken = request.params.token;

        if(!currentPassword) {
            return next(new ErrorResponse("Current password missing. Please try again", StatusCodes.BAD_REQUEST))
        }
    
        if(!newPassword) {
            return next(new ErrorResponse("Please specify the new password", StatusCodes.BAD_REQUEST))
        }
    
        const customer = await Customer.findOne({owner: request.customer.id, token: resetToken});

        if(!customer) {
            return next(new ErrorResponse("No user found", StatusCodes.BAD_REQUEST))
        }
    
        const customerPasswordsMatch = await customer.comparePasswords(currentPassword); // Check if passwords match before resetting password
    
        if(!customerPasswordsMatch) {
           return next(new ErrorResponse("Current Password Invalid", StatusCodes.BAD_REQUEST))
        }
    
        customer.password = newPassword;    
        await customer.save(); // Save new user after reset the password
    
        return response.status(StatusCodes.OK).json({success: true, message: "Customer Password Reset Successfully"});
    } 
    
    catch(error) {

        if(error) {
            console.log(error);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error});
        }


    }

})

export const fetchLoggedInCustomer = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
        const customer = request.customer; // Store the user in the user object
        return response.status(StatusCodes.OK).json({success: true, customer});
    } 

)