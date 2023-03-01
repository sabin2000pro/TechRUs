require('dotenv').config();
import mongoose from 'mongoose';

const AUTH_SERVICE_DB_URI = process.env.AUTH_SERVICE_DB_URI;

export const connectAuthDatabase = async () => {

    try {

        return await mongoose.connect(AUTH_SERVICE_DB_URI).then(authConnection => {

            if(authConnection.connection) {
                return console.log(`Connected to the Authentication Database Schema success`)
            }

            else {
                return console.log(`Could not connect to auth schema successfully`);
            }

        })


    }
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }


}