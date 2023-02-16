require('dotenv').config();
import mongoose from 'mongoose';

const PAYMENTS_DB_URI = process.env.PAYMENTS_DB_URI || "";

export const connectPaymentsSchema = async (): Promise<any> => {
    
    try {

       return await mongoose.connect(PAYMENTS_DB_URI).then(conn => {

        if(conn.connection) {
            return console.log(`Connected to the payments schema succesfully...`);
        }

        else {
            return console.log(`Could not connect to the payments schema`)
        }


       })
    } 
    
    catch(error) {

       if(error) {
        return console.error(error);
       }


    }
}