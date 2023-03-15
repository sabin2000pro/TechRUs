import { ErrorResponse } from '../utils/error-response'
import {Product} from '../model/products-model';
import path from 'path';
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
        const resultsPerPage = 3; // How many products we want to display per page
        const searchKey = request.query.keyword;
        const page = parseInt(request.query.page) || 1; // Get the current page number
        const skipBy = resultsPerPage * (page - 1);

        const keyword = request.query.keyword ? {name: {$regex: searchKey, $options: 'i'}} : {}; // Keyword used to search for a product
        const numberOfProducts = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(resultsPerPage).skip(skipBy);

        if(!products) {
            return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "No products found"})
        }

        return response.status(StatusCodes.OK).json({success: true, products, numberOfProducts, page})
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

export const deleteProductByID = asyncHandler(async (request, response, next): Promise<any> => {
    const id = request.params.id;
    await Product.findByIdAndDelete(id);

    return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Product Deleted"})
})

export const deleteAllProducts = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    await Product.deleteMany();
    return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "No products found"})
})

export const uploadProductPhoto = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const file = request.files.file as any
    console.log(`Current File : `, file);

    if(!file) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Please upload a valid file"});
    }

    // Check the file size
    if(file.size > process.env.PRODUCTS_SERVICE_MAX_FILE_UPLOAD_SIZE) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "File size is too large, please upload again"});
    }

    const fileName = `product_photo_${request.params.id}${path.parse(file.originalname).ext}`;
    console.log(`The file name : `, fileName);

  file.mv(`${process.env.PRODUCTS_SERVICE_FILE_UPLOAD_PATH}/${fileName}`, async (error) => {

    if (error) {
      console.error(error);
      return next(new ErrorResponse('Problem with file upload', StatusCodes.INTERNAL_SERVER_ERROR));
    }

    await Product.findByIdAndUpdate(request.params.id, { image: `/images/${fileName}` });

})})