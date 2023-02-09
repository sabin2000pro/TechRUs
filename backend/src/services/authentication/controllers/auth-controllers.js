const User = require('../models/user-model');
const asyncHandler = require('express-async-handler');
const {StatusCodes} = require('http-status-codes');
const { isValidObjectId } = require('mongoose');
const {ErrorResponse} = require('../utils/error-response');
const { generateOTPCode } = require('../utils/generate-otp-code');

const verifyUserExists = (email) => {
    return User.findOne({email});
}

module.exports.registerUser = asyncHandler(async (request, response, next) => {

    try {

        const {username, email, password, role, zipcode, country, phone} = request.body;

        if(!username || !email || !password || !role || !zipcode || !country || !phone) {
            return next(new ErrorResponse(`Some of the fields are missing, please try again`, 400));
        }

        if(verifyUserExists(email)) { // If the user already exists
            return next(new ErrorResponse('The user with the'))
        }

        const user = await User.create({username, email, password, role, zipcode, country, zipcode}).save();
        const token = user.fetchAuthToken(); // Get the signed JSON Web Token

        return response.status(StatusCodes.CREATED).json({success: true, user, token});
    } 
    
    catch(error) {

        if(error) {
            return next(error);
        }
        
    }

})

module.exports.verifyEmailAddress = asyncHandler(async (request, response, next) => {

    try {

        const {userId, OTP} = request.body; // Extract the user id and OTP from the request body

        if(!isValidObjectId(userId)) {
            return next(new ErrorResponse("The User ID is invalid. Please verify it again", 400));
        }

        if(OTP === null) { // If there is no OTP present
           return next(new ErrorResponse("OTP is invalid, please check it again", 400));
        } 

        // Get the generated e-mail verification code
        const otp = generateOTPCode();
        console.log(otp);

        // Instantiate a new object for email verification by storing the User ID

    } 
    
    catch(error) {
        
        if(error) {
            return next(error);
        }

    }


})

module.exports.loginUser = asyncHandler(async (request, response, next) => {

    try {
        const {email, password} = request.body;
    } 
    
    catch(error) {
        if(error) {
            return next(error);
        }

    }

})

module.exports.logout = asyncHandler(async (request, response, next) => {
    try {
        // Clear the cookie from the user session
    } 
    
    catch(error) {

    }  
})

module.exports.verifyLoginMFA = asyncHandler(async (request, response, next) => {
    try {

    } 
    
    catch(error) {

    }
})

module.exports.forgotPassword = asyncHandler(async (request, response, next) => {
    try {

    } 
    
    catch(error) {

    }
})

module.exports.resetPassword = asyncHandler(async (request, response, next) => {
    try {

    } 
    
    catch(error) {

    }
})

module.exports.fetchLoggedInUser = asyncHandler(async (request, response, next) => {
    try {

    } 
    
    catch(error) {

    }


})