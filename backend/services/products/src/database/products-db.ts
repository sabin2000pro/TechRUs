import dotenv from 'dotenv';
dotenv.config({path: '/Users/sabin2000/Documents/TechRUs/backend/src/services/products/config.env'})
import mongoose from 'mongoose';

const PRODUCTS_DB_URI = process.env.PRODUCTS_DB_URI

export const connectProductsSchema = async () => {

    try {

        return await mongoose.connect(PRODUCTS_DB_URI as any).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to the products schema`)
            }

            else {
                return console.log(`Could not connect to the products schema`)
            }

        })
    }
    
    catch(error) {

        if(error) {
            return console.log(error);
        }

    }


}