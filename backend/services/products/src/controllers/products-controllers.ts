import { ErrorResponse } from '../utils/error-response'
import {Product} from '../model/products-model';
import {Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';

export const fetchAllProducts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
        const pagination = {} // Create object for pagination
        const productsCount = await Product.countDocuments({});

        const queryCopy = {...request.query};
        const page = parseInt(request.query.page) || 1;
        const productsPerPage = 4;
        
        const products = await Product.find();

        if(!products) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No products found"})
        }

        return response.status(StatusCodes.OK).json({success: true, products, productsPerPage, productsCount})
    }
)

export const fetchSingleProductByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const id = request.params.id;
        const product = await Product.findById(id);

        if(!isValidObjectId(id)) {
           return next(new ErrorResponse(`Product with that ID cannot be found`, StatusCodes.BAD_REQUEST));
        }

        return response.status(StatusCodes.OK).json({success: true, product});
    }
    
)

export const createNewProduct = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
``
       request.body.user = request.user._id; // When creating a product, add the currently logged in user to the body of the request
       const {name, description, warranty, image, price, stockCount, lowStockAlert, isNew} = request.body;

       if(!name.toString() || !description.toString() || !warranty.toString() || !image.toString() || !price.toString() || !stockCount || !lowStockAlert || !isNew) {
           return next(new ErrorResponse(`Some entries are missing. Please check again when creating a product`, StatusCodes.BAD_REQUEST));
       }

       const product = await Product.create({name, description, warranty, image, price, stockCount, lowStockAlert, isNew});
       await product.save();
       return response.status(StatusCodes.CREATED).json({success: true, product});
    }

)

export const fetchNewProducts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const newProducts = await Product.find({isNew: true});

    if(!newProducts) {
      return next(new ErrorResponse(`No new products found`, StatusCodes.BAD_REQUEST));
    }
    
    return response.status(StatusCodes.OK).json({success: true, newProducts});

})

export const editProductByID = asyncHandler(async (request: any, response: Response, next: NextFunction) => {

})

export const deleteProductByID = asyncHandler(async (request, response, next) => {

})


export const deleteAllProducts = asyncHandler(async (request, response, next) => {


})

export const uploadProductPhoto = asyncHandler(async (request, response, next) => {

})