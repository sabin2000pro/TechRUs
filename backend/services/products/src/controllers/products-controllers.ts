import { ErrorResponse } from '../utils/error-response'
import {Product} from '../model/products-model';
import {Response, NextFunction} from 'express'
import asyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {isValidObjectId} from 'mongoose';
import {createEmailTransporter} from '../utils/email-transporter'

export const sendLowStockEmail = (transporter: any, user: any, currStock: number) => {

    try {
       // Send the low stock e-mail to the inbox
         return transporter.sendMail({

        from: 'lowstockinventory@techrus.com',
        to: user.email,
        subject: 'Low Product Stock',
        html: `
        
       <p>Warning - The product you are creating is low in stock, more will be ordered from the inventory system</p>
       <h3>${currStock}</h3>

        `
    })
    }
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }


}

export const fetchAllProducts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

        const products = await Product.find();
        const numberOfProducts = await Product.countDocuments({}); // Get the total number of products there are in the database

        if(!products) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No products found"})
        }

        return response.status(StatusCodes.OK).json({success: true, products, numberOfProducts})
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

       request.body.user = request.user._id; // When creating a product, add the currently logged in user to the body of the request
       const loggedInUserEmail = request.user.email;
       const {name, description, warranty, image, price, stockCount, lowStockAlert, isNew} = request.body;

       let currStockCount;
       currStockCount = stockCount; // Make a copy of the current product stock

       if(stockCount < 3) {
           const lowStockEmailTransporter = createEmailTransporter();
           sendLowStockEmail(lowStockEmailTransporter, loggedInUserEmail, currStockCount);
       }

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

export const editProductByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    let product = await Product.findById(id);

    if(!product) {
      return next(new ErrorResponse(`No product found with that ID `, StatusCodes.BAD_REQUEST));
    }

    product = await Product.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
    await product.save();
    return response.status(StatusCodes.OK).json({success: true, product});
})

export const deleteProductByID = asyncHandler(async (request, response, next) => {

})

export const deleteAllProducts = asyncHandler(async (request, response, next) => {
    await Product.deleteMany();
})

export const uploadProductPhoto = asyncHandler(async (request: any, response, next) => {
    const file = request.file.files
})