const Product = require('../model/products-model');
const asyncHandler = require('express-async-handler');
const {StatusCodes} = require('http-status-codes');
const { isValidObjectId } = require('mongoose');

module.exports.fetchAllProducts = asyncHandler(async (request, response, next) => {

    try {
        const products = await Product.find();
        return response.status(StatusCodes.OK).json({success: true, products})
    }
    
    catch(error)  {
        if(error) {
            return next(error);
        }
    }

})

module.exports.fetchSingleProductByID = asyncHandler(async (request, response, next) => {

    try {

        const productId = request.params.productId;
        const product = await Product.findById(productId);

        // Validate the Product ID
        if(!isValidObjectId(productId)) {
           
        }

        if(!product) {

        }



    }
    
    catch(error) {

        if(error) {
            return next(error);
        }


    }


})

module.exports.createNewProduct = asyncHandler(async (request, response, next) => {

    try {

    }
    
    catch(error) {

    }

})

module.exports.fetchPopularProducts = asyncHandler(async (request, response, next) => {

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