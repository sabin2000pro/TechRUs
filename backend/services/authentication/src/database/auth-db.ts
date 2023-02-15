require('dotenv').config();
import mongoose from 'mongoose';

const AUTH_DB_URI = process.env.AUTH_DB_URI;

export const connectAuthDatabase = async () => {

    try {

        return await mongoose.connect(AUTH_DB_URI).then(authConnection => {

            if(authConnection.connection) {
                return console.log(`Connected to the auth database succesfully`)
            }

            else {
                return console.log(`Could not connect to auth database successfully`);
            }

        })


    }
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }


}