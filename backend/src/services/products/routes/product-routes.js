const express = require('express');
const productRouter = express.Router({mergeParams: true});
const productController = require('../controllers/products-controllers');
const {verifyAuth} = require('../../authentication/middleware/verify-auth');

productRouter.route('/').get(productController.fetchAllProducts).post(verifyAuth, productController.createNewProduct).delete(verifyAuth ,productController.deleteAllProducts)
productRouter.route('/:productId').get(productController.fetchSingleProductByID).put(productController.editProductByID).delete(productController.deleteProductByID);

module.exports = productRouter;