const {StatusCodes} = require('http-status-codes');

module.exports.errorHandler = async (err, request, response, next) => {
    let error = {...err};
    error.message = err.message;

    // Check the types of errors

    return response.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
}