const User = require('../models/user-model');
const asyncHandler = require('express-async-handler');
const {StatusCodes} = require('http-status-codes');
const { isValidObjectId } = require('mongoose');
const {ErrorResponse} = require('../utils/error-response');

const verifyUserExists = (email) => {
    return User.findOne({email});
}

module.exports.registerUser = asyncHandler(async (request, response, next) => {

    try {

        const {username, email, password, role, zipcode, country, phone} = request.body;

        if(!username || !email || !password || !role || !zipcode || !country || !phone) {

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

        const {userId, OTP} = request.body;

        if(!isValidObjectId(userId)) {

        }

        if(OTP === null) { // If there is no OTP present
            // Send back error response
        } 

    } 
    
    catch(error) {
        
        if(error) {

        }

    }


})

module.exports.loginUser = asyncHandler(async (request, response, next) => {

    try {

    } 
    
    catch(error) {

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