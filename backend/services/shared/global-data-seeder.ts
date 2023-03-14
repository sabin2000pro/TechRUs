require('dotenv').config();
import { connectAuthDatabase } from '../authentication/src/database/auth-schema';
import { connectProductsSchema } from './../products/src/database/products-db';
import {connectOrdersSchema} from './../orders/src/database/orders-schema';
import { connectPaymentsSchema } from './../payments/src/database/payments-schema';
import {User} from '../authentication/src/models/user-model';
import {Product} from '../products/src/model/products-model';
import { Order } from '../orders/src/model/order-model';
import {Payment} from '../payments/src/models/payment-model';
import {Shipping} from '../shipping-service/src/model/shipping-model';

import users from '.././authentication/src/data/users.json';
import products from '../products/src/data/products.json';
import orders from '../orders/src/data/orders.json';
import payments from '../payments/src/data/payments.json';

// Import the load schemas functions

const connectServiceSchemas = () => {
    connectAuthDatabase();
    connectProductsSchema();
    connectOrdersSchema();
    connectPaymentsSchema();
}

connectServiceSchemas()
// Functions to import and remove data

const importServiceData = async () => {

    try {
     // First delete the existing data

     await User.deleteMany();
     await Product.deleteMany();
     await Order.deleteMany();

     await User.insertMany(users);     
     await Product.insertMany(products);
     await Order.insertMany(orders)
     await Payment.insertMany(payments);

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
        await Payment.deleteMany();

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