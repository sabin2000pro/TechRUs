require('dotenv').config();
import mongoose from 'mongoose';

const REVIEWS_SERVICE_DB_URI = process.env.REVIEWS_SERVICE_DB_URI || ""

export const connectReviewSchema = async () => {

    try {

      return await mongoose.connect(REVIEWS_SERVICE_DB_URI!).then(conn => {

         if(conn.connection) {
            return console.log(`Reviews Service connected to its schema`);
         }

         else {
            return console.log(`Could not connect to the reviews schema`);
         }

      })


    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }
}
