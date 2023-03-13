require('dotenv').config();
import mongoose from 'mongoose';

const SHIPPING_SERVICE_DB_URI = process.env.SHIPPING_SERVICE_DB_URI || 5411;


export const connectShippingSchema = async () => {

    try {

      return await mongoose.connect(SHIPPING_SERVICE_DB_URI as any).then(conn => {

          if(conn.connection) {
             return console.log(`Connected to the shipping schema...`)
          }

          else {
            return console.log(`Could not connect to the shipping schema`);
          }


      })
    } 
    
    catch(error) {

      if(error) {
         return console.error(error);
      }


    }


}