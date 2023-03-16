"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_controllers_1 = require("../controllers/products-controllers");
exports.productRouter = express_1.default.Router();
exports.productRouter.route('/').get(products_controllers_1.fetchAllProducts).post(products_controllers_1.createNewProduct).delete(products_controllers_1.deleteAllProducts);
exports.productRouter.route('/:id').get(products_controllers_1.fetchSingleProductByID).put(products_controllers_1.editProductByID).delete(products_controllers_1.deleteProductByID);
exports.productRouter.route('/new').get(products_controllers_1.fetchNewProducts);
exports.productRouter.route('/:id/upload-photo').put(products_controllers_1.uploadProductPhoto);
