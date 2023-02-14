const express = require('express');
const productRouter = express.Router({mergeParams: true});
const productController = require('../controllers/products-controllers');

productRouter.route('/').get(productController.fetchAllProducts).post(productController.createNewProduct).delete(productController.deleteAllProducts)
productRouter.route('/:productId').get(productController.fetchSingleProductByID).put(productController.editProductByID).delete(productController.deleteProductByID);

module.exports = productRouter;