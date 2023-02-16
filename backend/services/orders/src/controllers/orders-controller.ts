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
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message});
       }


    }

})

export const fetchSingleOrderByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const orderId = request.params.orderId;
        let order = await Order.findById(orderId);

        if(!order) {

        }

        
    }  
    
    catch(error) {

      if(error) {

      }

    }

})


export const editOrderStatus = asyncHandler(async (request, response, next) => {
    try {

      const {orderStatus} = request.body;
    }
    
    catch(error) {

    }

})


export const deleteOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    }
    
    catch(error) {

    }
})

export const deleteSingleOrderByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    }
    
    catch(error) {

    }
})