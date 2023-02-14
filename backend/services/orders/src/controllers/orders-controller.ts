import {Order} from '../model/order-model';
import {StatusCodes} from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

export const fetchAllOrders = asyncHandler(async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    try {

       const orders = await Order.find();
       
       if(!orders) {
          
       }

       return response.status(StatusCodes.OK).json({success: true, data: orders});
    }
    
    catch(error) {

       if(error) {

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