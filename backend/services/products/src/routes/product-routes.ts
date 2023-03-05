import express from 'express';
import { fetchAllProducts, createNewProduct, fetchSingleProductByID, editProductByID } from '../controllers/products-controllers';

export const productRouter = express.Router();

productRouter.route('/').get(fetchAllProducts).post(createNewProduct).delete(deleteAllProducts)
productRouter.route('/:productId').get(fetchSingleProductByID).put(editProductByID).delete(productController.deleteProductByID);

module.exports = productRouter;