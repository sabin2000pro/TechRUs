import express from 'express';
import multer from 'multer'
import { fetchAllProducts, createNewProduct, fetchSingleProductByID, editProductByID, deleteAllProducts, deleteProductByID, uploadProductPhoto, fetchNewProducts } from '../controllers/products-controllers';

export const productRouter = express.Router();

// Define storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, 'public/images/products'); // upload the photos to the public folder
    },

    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // set the file name to be unique
    }

  });

  const productFileUpload = multer({storage});

productRouter.route('/').get(fetchAllProducts).post(createNewProduct).delete(deleteAllProducts)
productRouter.route('/:id').get(fetchSingleProductByID).put(editProductByID).delete(deleteProductByID);

productRouter.route('/new').get(fetchNewProducts);
productRouter.route('/upload-product-photo').post(uploadProductPhoto, productFileUpload.single("photo"));