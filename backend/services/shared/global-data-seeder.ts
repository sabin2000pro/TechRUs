require('dotenv').config();

import { connectAuthDatabase } from '../authentication/src/database/auth-db';
import {connectCategoriesSchema} from '../categories/src/database/categories-schema';
import { connectProductsSchema } from './../products/src/database/products-db';
import { connectCustomersSchema } from './../customers/src/database/customers.schema';

import {Customer} from '../authentication/src/models/customer-model';
import {Category} from '../categories/src/model/categories-model';
import {Product} from '../products/src/model/products-model';
import { Order } from '../orders/src/model/order-model';
import {Review} from '../reviews/src/model/review-model';
import {Coupon} from '../coupons/src/model/coupon-model';

import customers from '.././authentication/src/data/customers.json';
import categories from '../categories/src/data/categories.json';
import products from '../products/src/data/products.json';
import orders from '../orders/src/data/orders.json';
import reviews from '../reviews/src/data/reviews.json';
import coupons from '../coupons/src/data/coupons.json';

// Import the load schemas functions

const connectServiceSchemas = () => {
    connectAuthDatabase();
    connectCategoriesSchema();
    connectProductsSchema();
    connectCustomersSchema();
}

connectServiceSchemas();

// Functions to import and remove data

const importServiceData = async () => {

    try {
     // First delete the existing data

     await Customer.deleteMany();
     await Category.deleteMany();

     await Product.deleteMany();
     await Order.deleteMany();
     await Review.deleteMany();
     await Coupon.deleteMany();


     // Import the data

     await Customer.insertMany(customers);
     await Category.insertMany(customers);
     
     await Product.insertMany(products);
     await Review.insertMany(reviews)

     await Coupon.insertMany(coupons);

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

        await Customer.deleteMany();
        await Category.deleteMany();
   
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();
        await Coupon.deleteMany();


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