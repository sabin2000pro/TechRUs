require('dotenv').config();
import bcrypt from 'bcryptjs'
import { connectShippingSchema } from './../shipping-service/src/schema/shipping-schema';
import { connectReviewSchema } from './../reviews-service/src/database/reviews-schema';
import { connectCouponsSchema } from './../coupons-service/src/database/coupons-schema';
import { connectAuthDatabase } from '../authentication-service/src/database/auth-schema';
import { connectProductsSchema } from './../products-service/src/database/products-db';
import {connectOrdersSchema} from '../orders-service/src/database/orders-schema';
import { connectPaymentsSchema } from '../payments-service/src/database/payments-schema';
import {User} from '../authentication-service/src/models/user-model';
import {Product} from '../products-service/src/model/products-model';
import {Coupon} from '../coupons-service/src/model/coupon-model';
import { Order } from '../orders-service/src/model/order-model';
import {Payment} from '../payments-service/src/models/payment-model';
import {Shipping} from '../shipping-service/src/model/shipping-model';
import {Review} from '../reviews-service/src/model/review-model';

import users from '.././authentication-service/src/data/users.json';
import products from '../products-service/src/data/products.json';
import orders from '../orders-service/src/data/orders.json';
import payments from '../payments-service/src/data/payments.json';
import coupons from '../coupons-service/src/data/coupons.json';
import shipping from '../shipping-service/src/data/shipping.json';
import reviews from '../reviews-service/src/data/reviews.json';

// Import the load schemas functions

const hashUserPassword = async (password: string) => { // Function to hash the user password, takes in the user password as a parameter
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the user password
    return hashedPassword;
}

const connectServiceSchemas = () => {
    connectAuthDatabase();
    connectProductsSchema();
    connectShippingSchema();
    connectOrdersSchema();
    connectCouponsSchema();
    connectReviewSchema();
    connectPaymentsSchema();
}

connectServiceSchemas()
// Functions to import and remove data

const importServiceData = async () => {

    try {

     // First delete the existing data before importing any data

     await User.deleteMany();
     await Product.deleteMany();
     await Order.deleteMany();
     await Coupon.deleteMany();
     await Review.deleteMany();

     const hashedUsers = await Promise.all(users.map ( async (user) => {
        const hashedPassword = await hashUserPassword(user.password);
        return { ...user, password: hashedPassword };
      }));

     await User.insertMany(hashedUsers);     
     await Product.insertMany(products);
     await Order.insertMany(orders)
     await Payment.insertMany(payments);
     await Shipping.insertMany(shipping)
     await Coupon.insertMany(coupons);
     await Review.insertMany(reviews);

     console.log(`All data inserted to each service schema successfully`);

     return process.exit(1);

    }     
    
    catch(error) {

        if(error) {
            console.error(error);
            process.exit(1);
        }

    }


}

// Function to remove all the service data from their schema
const removeServiceData = async () => {

    try {

        await User.deleteMany();   
        await Product.deleteMany();
        await Order.deleteMany();
        await Shipping.deleteMany();
        await Payment.deleteMany();
        await Coupon.deleteMany();
        await Review.deleteMany();

         console.log(`All data removed from each service schema successfully`);
         return process.exit(1);
    } 
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }

}

if(process.argv[2] === '--import') {
    importServiceData();
}

if(process.argv[2] === '--remove') {
    removeServiceData();
}