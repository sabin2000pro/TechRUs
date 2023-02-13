const dotenv = require('dotenv');
dotenv.config({path: '../'})
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const couponPort = process.env.COUPONS_PORT || 5402

// Mount the middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: "*",
    methods: ["POST", "PUT", "DELETE", "PATCH", "GET"]
}))

// Mount the Coupon API Endpoints

const couponsServer = app.listen(couponPort, (error) => {

    try {

        if(!error) {
            return console.log(`Coupons Service Server listening for incoming requests on port ${couponPort} in mode: ${process.env.NODE_ENV}`)
        }

    }   
    
    catch(error) {

        if(error) {
            return console.error(error);
        }
        
    }


})

module.exports = couponsServer;