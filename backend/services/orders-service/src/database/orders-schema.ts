require('dotenv').config();
import mongoose, {Connection} from 'mongoose';

const ORDERS_DB_URI = process.env.ORDERS_DB_URI || "" as string;

export const connectOrdersSchema = async (): Promise<any> => { // Create connection to the orders schema

    try {

       return await mongoose.connect(ORDERS_DB_URI as any).then(conn => {
        
            if(conn.connection) {
                return console.log(`Connected to the orders schema`);
            }

            else {
                return console.log(`Could not connect to the orders schema`);
            }
       })
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }


    }


}