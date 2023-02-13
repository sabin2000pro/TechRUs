const Order = require('../model/order-model');
const {StatusCodes} = require('http-status-codes');
const asyncHandler = require('express-async-handler')


module.exports.fetchCustomerOrders = asyncHandler(async (request, response, next) => {

    try {

        const reqQuery = {...request.query};
        const orders = await Order.find();

        if(!orders) {

        }

        return response.status(StatusCodes.OK).json({success: true, orders});
    } 
    
    catch(error) {
        
        if(error) {
            return next(error);
        }
        
    }


})

module.exports.fetchSingleOrderByID = asyncHandler(async (request, response, next) => {

    try {
        const orderId = request.params.orderId;
    }  
    
    catch(error) {

    }

})


module.exports.editOrderStatus = asyncHandler(async (request, response, next) => {

})


module.exports.deleteOrders = asyncHandler(async (request, response, next) => {

})


module.exports.deleteSingleOrderByID = asyncHandler(async (request, response, next) => {

})