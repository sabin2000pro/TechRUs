const Product = require('../model/products-model');
const asyncHandler = require('express-async-handler');

module.exports.fetchAllProducts = asyncHandler(async (request, response, next) => {

    try {

    }
    
    catch(error) {

    }

})

module.exports.fetchSingleProductByID = asyncHandler(async (request, response, next) => {

    try {

    }
    
    catch(error) {

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