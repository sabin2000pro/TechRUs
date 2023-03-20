import express, {Router} from 'express';
import { fetchAllCoupons, fetchCouponByID, createNewCoupon, editCouponByID, editCouponExpirationDates, deleteCoupons, deleteCouponByID } from '../controllers/coupon-controllers';

export const couponRouter = express.Router();

couponRouter.route('/').get(fetchAllCoupons).post(createNewCoupon).delete(deleteCoupons)