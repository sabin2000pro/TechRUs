// Mount the Categories API endpoints
import dotenv from 'dotenv';
dotenv.config({path: '/Users/sabin2000/Documents/TechRUs/backend/services/categories/config.env'})
import {app} from './app';
const categoriesPort = process.env.CATEGORIES_PORT! || 5401

export const startCategoriesServer = app.listen(categoriesPort, (error: any) => {
    
    try {

        if(!error) {
            return console.log(`Categories Service Server listening for requests on port ${categoriesPort} in mode: ${process.env.NODE_ENV}`)
        }

    }
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }
})

startCategoriesServer();