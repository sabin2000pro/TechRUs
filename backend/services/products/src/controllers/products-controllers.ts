import {Product} from '../model/products-model';
import {Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';

export const fetchAllProducts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const products = await Product.find();

        if(!products) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No products found"})
        }

        return response.status(StatusCodes.OK).json({success: true, products})
    }
    
    catch(error)  {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
        }

    }

})

export const fetchSingleProductByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const productId = request.params.productId;
        const product = await Product.findById(productId);

        if(product === null) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: `No product with ID : ${productId} found`});
        }

        return response.status(StatusCodes.OK).json({success: true, product});
    }
    
    catch(error) {

        if(error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
        }


    }


})

export const createNewProduct = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
       request.body.customer = request.customer._id;
       const productBody = request.body;
       const product = await Product.create(productBody);

       await product.save();
    }
    
    catch(error) {

        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }

})

export const fetchNewProducts = asyncHandler(async (request, response, next) => {

    try {

    }
    
    catch(error) {

    }


})


module.exports.editProductByID = asyncHandler(async (request, response, next) => {

    try {

        const productId = request.params.productId || undefined
        const product = await Product.findById(productId);
    }
    
    catch(error) {

    }


})


module.exports.deleteProductByID = asyncHandler(async (request, response, next) => {
    try {

    }
    
    catch(error) {

    }

})


module.exports.deleteAllProducts = asyncHandler(async (request, response, next) => {
    try {

    }
    
    catch(error) {

    }

})

module.exports.uploadProductPhoto = asyncHandler(async (request, response, next) => {

    try {

    }
    
    catch(error) {

    }

})