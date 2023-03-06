require('dotenv').config();
import mongoose from 'mongoose';

const USERS_SERVICE_DB_URI = process.env.CUSTOMERS_SERVICE_DB_URI

export const connectUsersSchema = async () => {

    try {

        return await mongoose.connect(USERS_SERVICE_DB_URI!).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to the users service database schema`)
            }

            else {
                return console.log(`Could not connect to the users service database schema`)
            }

        })

    } 
    
    catch(error) {
        
      if(error) {
        return console.error(error);
      }


    }


}