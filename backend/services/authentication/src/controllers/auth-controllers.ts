import { EmailVerification } from './../models/verify-email-model';
import { createEmailTransporter } from './../utils/send-mail';
import {generateCode } from './../utils/generate-otp-code';
import {User} from '../models/user-model';
import {Request, Response, NextFunction} from 'express';
import {TwoFactorVerification} from '../models/two-factor-model';
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import {ErrorResponse} from '../utils/error-response';
import {PasswordReset} from '../models/password-reset-model';

export const rootRoute = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "Root Route Auth!"});
})

export const verifyUserExists = async (email: any): Promise<any> => {
    return await User.findOne({email}); // Returns true or false if the user with that e-mail address already exists in the database
}

  // @description: Sends the verify confirmation e-mail to the user after registering an account
  // @parameters: Transporter Object, User Object, Randomly Generated User OTP
  // @returns: void
  // @public: True (No Authorization Required)

  export const sendEmailConfirmationEmail = (transporter: any, newUser: any, userOTP: number) => {

    return transporter.sendMail({

        from: 'verification@techrus.com',
        to: newUser.email,
        subject: 'E-mail Verification',
        html: `
        
        <p>Your verification OTP</p>
        <h1> ${userOTP}</h1>

        `
    })
}

export const sendLoginMfa = (transporter: any, user: any, userMfa: any) => {

    return transporter.sendMail({
        from: 'mfa@techrus.com',
        to: user.email,
        subject: 'Login MFA Verification',
        html: `
        
        <p>Your MFA code</p>
        <h1> ${userMfa}</h1>
        `
    })
}

export const sendForgotPasswordResetLink = (user: any, resetPasswordURL: string) => {

    const transporter = createEmailTransporter();
     
   return transporter.sendMail({
        from: 'resetpassword@techrus.dev',
        to: user.email,
        subject: 'Reset Password',
        html: `
        
        <h1> ${resetPasswordURL}</h1>
        `
    })
}

export const sendTokenResponse = (request: Express.Request, user: any, statusCode: number, response: any): Promise<any> => {
    const token = user.fetchAuthToken();
    request.session = {token}; // Store the token in the session
 
    return response.status(statusCode).json({token, user}); // Send back the user object with the JWT which will be used in the frontend in a ProtectedRoutes Component used to verify if the user is currently logged in or not
}

export const sendResetPasswordTokenStatus = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({isTokenValid: true})
}

export const registerUser = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
        const {username, email, password} = request.body;

        if(!username || !email || !password) {
            return next(new ErrorResponse(`Some of the fields are missing, please try again`, StatusCodes.BAD_REQUEST));
        }

        if(await verifyUserExists(email)) { // If the user already exists
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Staff Already exists with that e-mail address"});
        }

        const user = await User.create({username, email, password});
        await user.save();

        const userOTP = generateCode();  // Generate the OTP

        const customerVerification = new TwoFactorVerification({owner: user._id, mfaToken: userOTP});
        await customerVerification.save();

        // Create the e-mail transporter to send the MFA token to the user's e-mail address
        const emailTransporter = createEmailTransporter();
        sendEmailConfirmationEmail(emailTransporter, user, userOTP as unknown as any);

        const userOTPVerificationCode = new EmailVerification({owner: user._id, otpToken: userOTP}) || undefined

        if(userOTPVerificationCode === undefined) {
            return next(new ErrorResponse(`The OTP Verification code is invalid`, StatusCodes.BAD_REQUEST));
        }

        console.log(`Your User OTP Verification`, userOTPVerificationCode)
        await userOTPVerificationCode.save(); // Save the User OTP token to the database after creating a new instance of OTP

        return sendTokenResponse(request, user, StatusCodes.CREATED, response); // Send back the response to the user
    } 

)

export const verifyEmailAddress = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    const {userId, OTP} = request.body;
    const user = await User.findById(userId);

    // Check for invalid User ID
    if(!isValidObjectId(userId)) {
        return next(new ErrorResponse("User ID not found. Please check your entry again.", StatusCodes.NOT_FOUND))
    }

    // Check for missing OTP
    if(!OTP) {
        return next(new ErrorResponse("OTP Entered not found. Please check your entry", StatusCodes.NOT_FOUND))
    }

    if(!user) {
        return next(new ErrorResponse(`No user found with that ID`, StatusCodes.BAD_REQUEST));
    }

    // If the user is already verified
    if(user.isVerified) {
        return next(new ErrorResponse(`User account is already verified`, StatusCodes.BAD_REQUEST));
    }

    if(user.isActive) { // If the user account is already active before verifying their e-mail address, send back error
        return next(new ErrorResponse(`User account is already active`, StatusCodes.BAD_REQUEST));
    }

    const token = await EmailVerification.findOne({owner: userId}); // Find a verification token

    if(!token) {
        return next(new ErrorResponse(`OTP Verification token is not found. Please try again`, StatusCodes.BAD_REQUEST));
    }

    const otpTokensMatch = await token.compareVerificationTokens(OTP); // Check if they match

    if(!otpTokensMatch) {
        return next(new ErrorResponse(`The token you entered does not match the one in the database.`, StatusCodes.BAD_REQUEST));
    }

    if(otpTokensMatch) { // If the OTP Tokens Match

        user.isVerified = true // Set theu ser is Verified field to true
        user.accountActive = true;

        await user.save();
        await EmailVerification.findByIdAndDelete(token._id); // Find the token that belongs to the user and delete it

        const transporter = createEmailTransporter();

            // Send welcome e-mail
            transporter.sendMail({

                from: 'welcome@techrus.com',
                to: user.email,
                subject: 'E-mail Confirmation Success',
                html: `
                
                <h1> Welcome to TechRUs. Thank you for confirming your e-mail address.</h1>
                `
            })

        const jwtToken = user.fetchAuthToken();
        request.session = {token: jwtToken} as any || undefined;  // Get the authentication JWT token

        return response.status(StatusCodes.CREATED).json({message: "E-mail Address verified"});
    } 
})

export const resendEmailVerificationCode = asyncHandler (async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const {userId, OTP} = request.body;
        const currentCustomer = await User.findById(userId);

        if(!currentCustomer) { // If we have no current user
            return next(new ErrorResponse("Current user does not exist. Check user again", StatusCodes.BAD_REQUEST));
        }

        if(!isValidObjectId(userId)) {
            return next(new ErrorResponse("Owner ID invalid. Check again", StatusCodes.BAD_REQUEST));
        }

        if(!OTP) {
            return next(new ErrorResponse(`No OTP found. Please try again`, StatusCodes.BAD_REQUEST))
        }

        const token = await EmailVerification.findOne({owner: userId});

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
 
)

export const loginUser = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const {email, password} = request.body; // Extract the user e-mail and password from the request body

        if(!email || !password) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Missing e-mail address or password"});
        }
    
        const user = await User.findOne({email}).select("+password"); // Find the user before logging in

        if(!user) {
            return next(new ErrorResponse(`No user found with that e-mail address`, StatusCodes.BAD_REQUEST));
        }

        // Check if the passwords match
        const userPasswordsMatch = await user.comparePasswords(password);

        if(!userPasswordsMatch) {
            return next(new ErrorResponse(`Your current password is invalid. Please try again`, StatusCodes.BAD_REQUEST));
        }

        const userMfaToken = generateCode();
        const token = user.fetchAuthToken();
        
        const transporter = createEmailTransporter();
        sendLoginMfa(transporter as any, user as any, userMfaToken as any);

        const loginMfa = await TwoFactorVerification.create({owner: user, mfaToken: userMfaToken});
        await loginMfa.save();

        return response.status(StatusCodes.OK).json({success: true, user, token});
    } 
)

export const logoutUser = asyncHandler(async (request: any, response: Response, next): Promise<any> => {
        request.session = null;
        return response.status(StatusCodes.OK).json({success: true, message: "You have logged out successfully", user: null})
    }   
    
)

export const verifyLoginMFA = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {userId, multiFactorToken} = request.body;
    const customer = await User.findById(userId);

    if(!isValidObjectId(userId)) {
        return next(new ErrorResponse(`This user ID is not valid. Please try again`, StatusCodes.UNAUTHORIZED));
    }

    if(!multiFactorToken) {
        customer.isActive = false; // User is not active yet
        return next(new ErrorResponse("Please provide your MFA token", StatusCodes.BAD_REQUEST));
    }

    const factorToken = await TwoFactorVerification.findOne({owner: userId});

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

    const newToken = await TwoFactorVerification.create({owner: customer, mfaToken: multiFactorToken}); // Create a new instance of the token
    await newToken.save(); // Save the new token

    customer.isVerified = true; // User account is now verified
    customer.isActive = true; // And user account is active

    return response.status(StatusCodes.OK).json({customer, message: "Your account is now active"});
})

export const forgotPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
        const {email} = request.body;
        const user = await User.findOne({email});

       // Check if we have an e-mail in the body of the request
        if(!email) {
            return next(new ErrorResponse(`User with that e-mail not found`, StatusCodes.BAD_REQUEST))
        }
    
        if(!user) {
            return next(new ErrorResponse("No user found with that e-mail address", StatusCodes.NOT_FOUND));
        }
    
        const userHasResetToken = await PasswordReset.findOne({owner: user._id});
    
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
        sendForgotPasswordResetLink(user, resetPasswordURL); // Send the reset password e-mail to the customer
    
        return response.status(StatusCodes.OK).json({success: true, message: "Reset Password E-mail Sent"});
        
    } 
)

export const updatePassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const {currentPassword, newPassword} = request.body;

        if(!newPassword) {
            return next(new ErrorResponse("Please provide your new password", StatusCodes.BAD_REQUEST));
        }
    
        const user = await User.findById(<any>request.user._id);
    
        if(!user) {
            return next(new ErrorResponse("No user found", StatusCodes.BAD_REQUEST))
        }
    
        const currentPasswordMatch = user.comparePasswords(currentPassword);
    
        if(!currentPasswordMatch) { // If passwords do not match
            return next(new ErrorResponse("Current user password is invalid.", StatusCodes.BAD_REQUEST))
        }
    
        user.password = request.body.newPassword
        await user.save(); // Save new user
    
        return response.status(StatusCodes.OK).json({success: true, message: "User password updated"});
    } 
    
)

export const resetPassword = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const currentPassword = request.body.currentPassword;
        const newPassword = request.body.newPassword;
        const resetToken = request.params.token;

        if(!currentPassword) {
            return next(new ErrorResponse("Current password missing. Please try again", StatusCodes.BAD_REQUEST))
        }
    
        if(!newPassword) {
            return next(new ErrorResponse("Please specify the new password", StatusCodes.BAD_REQUEST))
        }
    
        const customer = await User.findOne({owner: request.customer.id, token: resetToken});

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

)

export const fetchLoggedInUser = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const user = request.user; // Store the user in the user object
        console.log(`The user : `, user);
        return response.status(StatusCodes.OK).json({success: true, user});
    } 

)

export const fetchAllUsers = asyncHandler(async(request: any, response: Response, next: NextFunction): Promise<any> => {
    const users = await User.find();

    if(!users) {
        return next(new ErrorResponse(`No users found`, StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, users});

})

export const fetchUserByID = asyncHandler(async(request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    const user = await User.findById(id);

    if(!isValidObjectId(id)) {
        return next(new ErrorResponse(`No ID provided. Please try again`, StatusCodes.BAD_REQUEST));
    }

    if(!user) {
      return next(new ErrorResponse(`No user found with that ID ${id} - pleasae try again`, StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, user});
})

export const editUserByID = asyncHandler(async(request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    let user = await User.findById(id);

    if(!user) {
        return next(new ErrorResponse(`No user found with that ID`, StatusCodes.BAD_REQUEST));
    }

    user = await User.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
})

export const editUserShifts = asyncHandler(async(request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    const {startShiftDate, endShiftDate} = request.body;
    const user = await User.findById(id);

    if(!isValidObjectId(id)) {
        
    }

    
})

export const deleteUserByID = asyncHandler(async(request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    await User.findByIdAndDelete(id);

    return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "User deleted succesfully"});
})

export const deleteAllUsers = asyncHandler(async(request: any, response: Response, next: NextFunction): Promise<any> => {
    
})