import express from 'express';
import { fetchAllProducts, createNewProduct, fetchSingleProductByID, editProductByID, deleteAllProducts, deleteProductByID, uploadProductPhoto, fetchNewProducts } from '../controllers/products-controllers';

export const productRouter = express.Router();

productRouter.route('/').get(fetchAllProducts).post(createNewProduct).delete(deleteAllProducts)
productRouter.route('/:id').get(fetchSingleProductByID).put(editProductByID).delete(deleteProductByID);

productRouter.route('/new').get(fetchNewProducts);
productRouter.route('/:id/upload-photo').put(uploadProductPhoto);