import { isValidObjectId } from 'mongoose';
import {ErrorResponse} from '../utils/error-response';
import { StatusCodes } from 'http-status-codes';
import {Response, NextFunction} from 'express';
import {Shipping} from '../model/shipping-model';
import asyncHandler from 'express-async-handler';

// @description: Fetches all the shipping details from the shipping microservice database
// @method: GET
export const fetchShippingDetails = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const shipping = await Shipping.find();

    if(!shipping) {
        return next(new ErrorResponse("No shipping details found.", StatusCodes.BAD_REQUEST));
    }

    response.setHeader('Access-Control-Allow-Origin', 'http://207.154.209.57');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return response.status(StatusCodes.OK).json({success: true, shipping});
})

export const fetchShippingDetailsByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    const shipping = await Shipping.findById(id);

    if(!isValidObjectId(id)) {
        return next(new ErrorResponse(`The shipping ID you provided is not in the correct format`, StatusCodes.BAD_REQUEST));
    }

    if(!shipping) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No shipping details found"})
    }

    return response.status(StatusCodes.OK).json({success: true, shipping});
})

export const createNewShipping = async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {user, address, city, country, postalCode, phoneNo} = request.body;

    if(!address || !city || !country || !postalCode || !phoneNo) {
        return next(new ErrorResponse(`Some of the shipping fields are missing. Please check again`, StatusCodes.BAD_REQUEST));
    }

    const shipping = await Shipping.create({user, address, city, country, postalCode, phoneNo});
    await shipping.save(); // Save the shipping resource to the database

    response.setHeader('Access-Control-Allow-Origin', 'http://207.154.209.57');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return response.status(StatusCodes.CREATED).json({success: true, shipping});
}

export const editShippingStatus = async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const {shippingStatus} = request.body;
    const fieldToUpdate = shippingStatus;

    const id = request.params.id;
    let shipping = await Shipping.findById(id);

    if(!isValidObjectId(id)) {
        return next(new ErrorResponse(`The shipping ID is not valid. Check the ID again`, StatusCodes.BAD_REQUEST));
    }

    if(!shipping) {
      return next(new ErrorResponse(`No shipping details found`, StatusCodes.BAD_REQUEST));
    }

    shipping = await Shipping.findByIdAndUpdate(id, fieldToUpdate, {new: true, runValidators: true});
    shipping.shippingStatus = shippingStatus;

    await shipping.save();
    return response.status(StatusCodes.OK).json({success: true, message: "Shipping status updated"});

}

export const editShippingDetails = async (request: any, response: Response, next: NextFunction): Promise<any> => {
   const id = request.params.id;
   const shippingFieldsToUpdate = {address: request.body.address, city: request.body.city, country: request.body.country, postalCode: request.body.postalCode, phoneNo: request.body.phoneNo};
   let shipping = await Shipping.findById(id);

   if(!isValidObjectId(id)) {
      return next(new ErrorResponse(`The shipping ID you provided is invalid. Check your ID`, StatusCodes.BAD_REQUEST));
   }

   if(!shipping) {
     return next(new ErrorResponse(`No shipping details found`, StatusCodes.BAD_REQUEST));
   }

   if(shippingFieldsToUpdate) {
      return next(new ErrorResponse(`Some of the shipping fields are missing, please try again`, StatusCodes.BAD_REQUEST));
   }

   shipping = await Shipping.findByIdAndUpdate(id, shippingFieldsToUpdate, {new: true, runValidators: true});
   await shipping.save();

   shipping.address = request.body.address;
   shipping.city = request.body.city

   shipping.country = request.body.country;
   shipping.postalCode = request.body.postalCode;
   shipping.phoneNo = request.body.phoneNo;

   return response.status(StatusCodes.OK).json({success: true, message: "Shipping Details Updated"})

}

export const deleteShippingDetails = async (request: any, response: Response, next: NextFunction): Promise<any> => {

    if(request.method === 'DELETE') {
        await Shipping.deleteMany();
        return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Shipping Details Deleted"});
    }
   
}