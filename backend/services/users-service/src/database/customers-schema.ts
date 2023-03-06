require('dotenv').config();
import mongoose from 'mongoose';

const CUSTOMERS_SERVICE_DB_URI = process.env.CUSTOMERS_SERVICE_DB_URI

export const connectCustomersSchema = async () => {
    try {
        return await mongoose.connect(CUSTOMERS_SERVICE_DB_URI!).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to the customers schema`)
            }

            else {
                return console.log(`Could not connect to the customers schema`)
            }


        })
    } 
    
    catch(error) {
        
      if(error) {
        return console.error(error);
      }


    }


}