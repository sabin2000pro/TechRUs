import { isValidObjectId } from 'mongoose';
import { ErrorResponse } from '../utils/error-response';
import {Order} from '../model/order-model';
import {StatusCodes} from 'http-status-codes';
import {Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

// @description: Fetches all the orders from the orders database
// @method: GET
// @route: /api/v1/orders
// @access: No Auth Token Required

export const fetchAllOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
       const ordersPerPage = 3;
       const totalOrders = await Order.countDocuments({});
       const currentPage = parseInt(request.query.page) || 1;
       
       const searchKeyword = request.query.keyword;
       const skipByPages = ordersPerPage * (currentPage - 1);

       const orders = await Order.find({...searchKeyword}); // Fetch all the orders
       let totalOrderAmount = 0;
       
       orders.forEach((currOrder) => {
          console.log(`All your orders : `, currOrder);
          totalOrderAmount += currOrder.totalPrice
       })
       
       if(!orders) {
            return next(new ErrorResponse(`Could not find any orders in the database`, StatusCodes.BAD_REQUEST));
       }

       return response.status(StatusCodes.OK).json({success: true, orders, totalOrders});
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
    const {user} = request.query;
    const {orderItems, shippingInformation, orderStatus, paymentInformation, itemPrice, taxPrice, shippingPrice, totalPrice} = request.body;
    
    // Validate the request body before creating a new instance of order
    if(!orderItems || !shippingInformation || !itemPrice || !taxPrice || !shippingPrice || !totalPrice) {
        return next(new ErrorResponse(`Some order fields are missing. Please check your entries`, StatusCodes.BAD_REQUEST));
    }

    request.body.user = user; // Add the logged in user ID to the body of the request from the query params

    const order = await Order.create({orderItems, shippingInformation, orderStatus, paymentInformation, itemPrice, taxPrice, shippingPrice, totalPrice});
    await order.save();

    return response.status(StatusCodes.CREATED).json({success: true, order});
})

export const updateOrderStatus = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {orderStatus} = request.body;
    const id = request.params.id;

    let order = await Order.findById(id);

    if(!order) {
        return next(new ErrorResponse(`No order found with ID : ${id}`, StatusCodes.BAD_REQUEST));
    }

    if(order?.orderStatus === 'Delivered') { // Before updating the order status, make sure it has not alreayd been delivered
        return next(new ErrorResponse(`The status of this order you are trying to update has already been delivered`, StatusCodes.BAD_REQUEST));
    }
    
    order = await Order.findByIdAndUpdate(id, orderStatus, {new: true, runValidators: true});
})

export const deleteOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
   await Order.deleteMany();
   return response.status(StatusCodes.NO_CONTENT).json({success: true, mesage: "Orders deleted successfully"})
})

export const deleteSingleOrderByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;

    if(!isValidObjectId(id)) {
        return next(new ErrorResponse(`Order with ID : ${id} - does not exist`, StatusCodes.BAD_REQUEST));
    }

    await Order.findByIdAndDelete(id);
    return response.status
})