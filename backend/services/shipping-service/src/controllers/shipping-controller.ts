import {ErrorResponse} from '../utils/error-response';
import { StatusCodes } from 'http-status-codes';
import {Response, NextFunction} from 'express';
import {Shipping} from '../model/shipping-model';
import asyncHandler from 'express-async-handler';

export const fetchShippingDetails = asyncHandler(async (request, response, next): Promise<any> => {
    const shipping = await Shipping.find();

    if(!shipping) {
        return next(new ErrorResponse("No shipping details found.", StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, shipping});
})

export const fetchShippingDetailsByID = asyncHandler(async (request, response, next): Promise<any> => {
    const id = request.params.id;
    const shipping = await Shipping.findById(id);

    if(!shipping) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No shipping details found"})
    }

    return response.status(StatusCodes.OK).json({success: true, shipping});
})

export const createNewShipping = async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {} = request.body;
}

export const editShippingStatus = async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {} = request.body;
    const id = request.params.id;
    let shipping = await Shipping.findById(id);
}

export const editShippingDetails = async (request, response, next) => {
   const id = request.params.id;
   let shipping = await Shipping.findById(id);

   if(!shipping) {

   }


}

export const deleteShippingDetails = async (request, response, next) => {

}

export const deleteShippingDetailsByID = async (request, response, next) => {
    
}