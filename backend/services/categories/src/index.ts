require('dotenv').config();
import { connectCategoriesSchema } from './database/categories-schema';
import { app } from "./app"

const CATEGORIES_PORT = process.env.CATEGORIES_PORT || 5401;

connectCategoriesSchema();

// Start of authentication server
export const startCategoriesServer = async () => {

      return app.listen(CATEGORIES_PORT, () => {
           console.log(`Categories Service Server is listening for requests on port ${CATEGORIES_PORT} in mode: ${process.env.NODE_ENV}`);
      });

}

startCategoriesServer()