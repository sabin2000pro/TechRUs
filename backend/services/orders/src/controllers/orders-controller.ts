import {Order} from '../model/order-model';
import {StatusCodes} from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

export const fetchAllOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
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

export const fetchSingleOrderByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const orderId = request.params.orderId;
    }  
    
    catch(error) {

      if(error) {

      }

    }

})


export const editOrderStatus = asyncHandler(async (request, response, next) => {

})


export const deleteOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

})


module.exports.deleteSingleOrderByID = asyncHandler(async (request, response, next) => {

})