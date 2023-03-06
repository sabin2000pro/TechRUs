import { ErrorResponse } from '../utils/error-response';
import {Order} from '../model/order-model';
import {StatusCodes} from 'http-status-codes';
import {Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

export const fetchAllOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
       const orders = await Order.find();
       let totalOrderAmount = 0;
       
       orders.forEach((currOrder) => {
          console.log(`All your orders : `, currOrder);
          totalOrderAmount += currOrder.totalPrice
       })
       
       if(!orders) {
            return next(new ErrorResponse(`Could not find any orders`, StatusCodes.BAD_REQUEST));
       }

       return response.status(StatusCodes.OK).json({success: true, orders});
    }
    
)

export const fetchSingleOrderByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const id = request.params.id;
        let order = await Order.findById(id);

        if(!order) {
            return next(new ErrorResponse(`No order found with ID : ${id}`, StatusCodes.BAD_REQUEST));
        }

        return response.status(StatusCodes.OK).json({success: true, order});
    }  
    
)

export const createNewOrder = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {orderItems, shippingInformation, orderStatus, paymentInformation, itemPrice, taxPrice, shippingPrice, totalPrice} = request.body;

    const order = await Order.create({orderItems, shippingInformation, orderStatus, paymentInformation, itemPrice, taxPrice, shippingPrice, totalPrice});
    await order.save();

    console.log(`Created Order : `, order);

    return response.status(StatusCodes.CREATED).json({success: true, order});
} )

export const udpateOrderStatus = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {orderStatus} = request.body;
    const id = request.params.id;

    let order = await Order.findById(id);

    if(!order) {
        return next(new ErrorResponse(`No order found with ID : ${id}`, StatusCodes.BAD_REQUEST));
    }

    if(order?.orderStatus === 'Delivered') { // Before updating the order status, make sure it has not alreayd been delivered
        return next(new ErrorResponse(`The status of this order you are trying to update has already been delivered`, StatusCodes.BAD_REQUEST));
    }

    // 1. Use axios to send a POST request to the endpoint of the API gateway which is responsible for updating the product stock after updating the order status

    console.log(`The order : `, order);

    order = await Order.findByIdAndUpdate(id, orderStatus, {new: true, runValidators: true});
})


export const deleteOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
   await Order.deleteMany();
   return response.status(StatusCodes.NO_CONTENT).json({success: true, mesage: "Orders deleted successfully"})
})

export const deleteSingleOrderByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
   
})