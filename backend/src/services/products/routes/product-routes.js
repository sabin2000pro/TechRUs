const express = require('express');
const productRouter = express.Router({mergeParams: true});
const productController = require('../controllers/products-controllers');
const {verifyAuth} = require('../../authentication/middleware/verify-auth');

productRouter.route('/').get(productController.fetchAllProducts);

module.exports = productRouter;