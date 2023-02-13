const {StatusCodes} = require('http-status-codes');
const {ValidationError} = require('express-validation');

module.exports.errorHandler = async (err, request, response, next) => {

    let error = {...err};
    error.message = err.message;

    // Check the types of errors

    if(err instanceof ValidationError) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message});
    }

    return response.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
}