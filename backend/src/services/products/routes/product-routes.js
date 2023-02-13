const express = require('express');
const productRouter = express.Router({mergeParams: true});
const productController = require('../controllers/products-controllers');

module.exports = productRouter;