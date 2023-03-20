import { Coupon } from "../model/coupon-model";
import asyncHandler from 'express-async-handler';
import {Response, NextFunction} from 'express';

export const fetchAllCoupons = asyncHandler(async (request, response: Response, next: NextFunction): Promise<any> => {
    const coupons = await Coupon.find();
})

export const fetchCouponByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    const coupon = await Coupon.findById(id);

    if(!coupon) {
     
    }


})

export const createNewCoupon = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    
})

export const editCouponByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

})

export const editCouponExpirationDates = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

})

export const deleteCoupons = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

})

export const deleteCouponByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

})