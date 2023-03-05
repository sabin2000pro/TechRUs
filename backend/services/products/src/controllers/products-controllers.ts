import {Product} from '../model/products-model';
import {Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import { ProductsAPIFeatures } from '../utils/api-features';

export const fetchAllProducts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {
        const query = request.query
        const productsPerPage = 4;

        const apiFeatures = new ProductsAPIFeatures(Product.find(), query).search().paginate(productsPerPage)
        const products = await apiFeatures!.query

        console.log(`Products : `, products)

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

export const fetchNewProducts = asyncHandler(async (request: any, response: Response, next: NextFunction) => {
    const newProducts = await Product.find({isNew: true});

    if(!newProducts) {

    }
})

export const editProductByID = asyncHandler(async (request: any, response: Response, next: NextFunction) => {

})

export const deleteProductByID = asyncHandler(async (request, response, next) => {

})


export const deleteAllProducts = asyncHandler(async (request, response, next) => {


})

export const uploadProductPhoto = asyncHandler(async (request, response, next) => {

})