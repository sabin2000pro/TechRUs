require('dotenv').config();
import mongoose from 'mongoose';

const CATEGORIES_DB_URI = process.env.CATEGORIES_DB_URI;

export const connectCategoriesSchema = async (): Promise<any> => {

    try {

        return await mongoose.connect(CATEGORIES_DB_URI as any).then(conn => {

            if(conn.connection) {
                return console.log(`Connected to the Categories Database Schema successesfully`)
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