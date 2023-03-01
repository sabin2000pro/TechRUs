require('dotenv').config();

import mongoose from 'mongoose';

const COUPONS_SERVICE_DB_URI = process.env.COUPONS_SERVICE_DB_URI;

export const connectCouponsSchema = async () => {

    try {
        return await mongoose.connect(COUPONS_SERVICE_DB_URI!).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to the coupons schema successfully`);
            }

            else {
                return console.log(`Could not connect to the coupons schema`)
            }


        })
    } 
    
    catch(error) {
        
        if(error) {
            return console.error(error);
        }


    }    


}