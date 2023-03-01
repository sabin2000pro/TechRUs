require('dotenv').config();

import mongoose from 'mongoose';

const COUPONS_SERVICE_DB_URI = process.env.COUPONS_SERVICE_DB_URI;

export const connectCouponsSchema = async () => {

    try {
        return await mongoose.connect(COUPONS_SERVICE_DB_URI)
    } 
    
    catch(error) {

    }
}