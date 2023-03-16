"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductPhoto = exports.deleteAllProducts = exports.deleteProductByID = exports.editProductByID = exports.fetchNewProducts = exports.createNewProduct = exports.fetchSingleProductByID = exports.fetchAllProducts = exports.sendLowStockEmail = void 0;
const error_response_1 = require("../utils/error-response");
const products_model_1 = require("../model/products-model");
const path_1 = __importDefault(require("path"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const sendLowStockEmail = (transporter, user, currStock) => {
    try {
        // Send the low stock e-mail to the inbox
        return transporter.sendMail({
            from: 'lowstockinventory@techrus.com',
            to: user.email,
            subject: 'Low Product Stock',
            html: `
        
       <p>Warning - The product you are creating is low in stock, more will be ordered from the inventory system</p>
       <h3>${currStock}</h3>

        `
        });
    }
    catch (error) {
        if (error) {
            return console.error(error);
        }
    }
};
exports.sendLowStockEmail = sendLowStockEmail;
exports.fetchAllProducts = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultsPerPage = 3; // How many products we want to display per page
    const searchKey = request.query.keyword;
    const page = parseInt(request.query.page) || 1; // Get the current page number
    const skipBy = resultsPerPage * (page - 1);
    const keyword = request.query.keyword ? { name: { $regex: searchKey, $options: 'i' } } : {}; // Keyword used to search for a product
    const numberOfProducts = yield products_model_1.Product.countDocuments(Object.assign({}, keyword));
    const products = yield products_model_1.Product.find(Object.assign({}, keyword)).limit(resultsPerPage).skip(skipBy);
    if (!products) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "No products found" });
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, products, numberOfProducts, page });
}));
exports.fetchSingleProductByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const product = yield products_model_1.Product.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`Product with that ID cannot be found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, product });
}));
exports.createNewProduct = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, warranty, price, stockCount, lowStockAlert } = request.body;
    if (!name || !description || !warranty || !price || !stockCount || !lowStockAlert) {
        return next(new error_response_1.ErrorResponse(`Some entries are missing. Please check again when creating a product`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    // 1. Check to see if the stock for the product is low and if it is true, send low stock e-mail to the inbox
    const product = yield products_model_1.Product.create({ name, description, warranty, price, stockCount, lowStockAlert });
    yield product.save();
    return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, product });
}));
exports.fetchNewProducts = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newProducts = yield products_model_1.Product.find({ isNew: true });
    if (!newProducts) {
        return next(new error_response_1.ErrorResponse(`No new products found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, newProducts });
}));
exports.editProductByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    let product = yield products_model_1.Product.findById(id);
    if (!product) {
        return next(new error_response_1.ErrorResponse(`No product found with that ID `, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    product = yield products_model_1.Product.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
    yield product.save(); // Save the new product
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, product });
}));
exports.deleteProductByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    yield products_model_1.Product.findByIdAndDelete(id);
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "Product Deleted" });
}));
exports.deleteAllProducts = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield products_model_1.Product.deleteMany();
    return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "No products found" });
}));
exports.uploadProductPhoto = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = request.files.file;
    if (!file) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "Please upload a valid file" });
    }
    // Check the file size
    if (file.size > process.env.PRODUCTS_SERVICE_MAX_FILE_UPLOAD_SIZE) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "File size is too large, please upload again" });
    }
    const fileName = `product_photo_${request.params.id}${path_1.default.parse(file.name).ext}`;
    file.mv(`${process.env.PRODUCTS_SERVICE_FILE_UPLOAD_PATH}/${fileName}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.error(error);
            return next(new error_response_1.ErrorResponse('Problem with file upload', http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
        }
        yield products_model_1.Product.findByIdAndUpdate(request.params.id, { image: `/images/${fileName}` });
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "File Uploaded" });
    }));
}));
