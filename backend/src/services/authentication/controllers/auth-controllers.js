const User = require('../models/user-model');
const asyncHandler = require('express-async-handler');
const {StatusCodes} = require('http-status-codes');
const { isValidObjectId } = require('mongoose');

module.exports.registerUser = asyncHandler(async (request, response, next) => {

    try {
        return response.status(StatusCodes.CREATED);
    } 
    
    catch(error) {

        if(error) {
            return response.status()
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

    }


})

module.exports.loginUser = asyncHandler(async (request, response, next) => {
    try {

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