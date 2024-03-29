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
exports.deleteShippingDetails = exports.editShippingDetails = exports.editShippingStatus = exports.createNewShipping = exports.fetchShippingDetailsByID = exports.fetchShippingDetails = void 0;
const mongoose_1 = require("mongoose");
const error_response_1 = require("../utils/error-response");
const http_status_codes_1 = require("http-status-codes");
const shipping_model_1 = require("../model/shipping-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @description: Fetches all the shipping details from the shipping microservice database
// @method: GET
exports.fetchShippingDetails = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipping = yield shipping_model_1.Shipping.find();
    if (!shipping) {
        return next(new error_response_1.ErrorResponse("No shipping details found.", http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, shipping });
}));
exports.fetchShippingDetailsByID = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const shipping = yield shipping_model_1.Shipping.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`The shipping ID you provided is not in the correct format`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!shipping) {
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: "No shipping details found" });
    }
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, shipping });
}));
const createNewShipping = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, address, city, country, postalCode, phoneNo } = request.body;
    if (!address || !city || !country || !postalCode || !phoneNo) {
        return next(new error_response_1.ErrorResponse(`Some of the shipping fields are missing. Please check again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const shipping = yield shipping_model_1.Shipping.create({ user, address, city, country, postalCode, phoneNo });
    yield shipping.save(); // Save the shipping resource to the database
    return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, shipping });
});
exports.createNewShipping = createNewShipping;
const editShippingStatus = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingStatus } = request.body;
    const fieldToUpdate = shippingStatus;
    const id = request.params.id;
    let shipping = yield shipping_model_1.Shipping.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`The shipping ID is not valid. Check the ID again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!shipping) {
        return next(new error_response_1.ErrorResponse(`No shipping details found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    shipping = yield shipping_model_1.Shipping.findByIdAndUpdate(id, fieldToUpdate, { new: true, runValidators: true });
    shipping.shippingStatus = shippingStatus;
    yield shipping.save();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Shipping status updated" });
});
exports.editShippingStatus = editShippingStatus;
const editShippingDetails = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const shippingFieldsToUpdate = { address: request.body.address, city: request.body.city, country: request.body.country, postalCode: request.body.postalCode, phoneNo: request.body.phoneNo };
    let shipping = yield shipping_model_1.Shipping.findById(id);
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next(new error_response_1.ErrorResponse(`The shipping ID you provided is invalid. Check your ID`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (!shipping) {
        return next(new error_response_1.ErrorResponse(`No shipping details found`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    if (shippingFieldsToUpdate) {
        return next(new error_response_1.ErrorResponse(`Some of the shipping fields are missing, please try again`, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    shipping = yield shipping_model_1.Shipping.findByIdAndUpdate(id, shippingFieldsToUpdate, { new: true, runValidators: true });
    yield shipping.save();
    shipping.address = request.body.address;
    shipping.city = request.body.city;
    shipping.country = request.body.country;
    shipping.postalCode = request.body.postalCode;
    shipping.phoneNo = request.body.phoneNo;
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Shipping Details Updated" });
});
exports.editShippingDetails = editShippingDetails;
const deleteShippingDetails = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.method === 'DELETE') {
        yield shipping_model_1.Shipping.deleteMany();
        return response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ success: true, message: "Shipping Details Deleted" });
    }
});
exports.deleteShippingDetails = deleteShippingDetails;
