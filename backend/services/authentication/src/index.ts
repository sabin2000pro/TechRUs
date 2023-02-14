import dotenv from 'dotenv';
import {app} from './app'
dotenv.config({path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env'})

const AUTH_PORT = process.env.AUTH_PORT || 6000;
const AUTH_DEV_MODE = process.env.AUTH_DEV_MODE || 'development'

export const startAuthServer = () => {

    try {
        return console.log(`The Authentication server is listening on port ${AUTH_PORT} in mode ${AUTH_DEV_MODE}`)
    } 
    
    catch(error) {

      if(error) {
         return console.error(error);
     }

    }

}

startAuthServer(); // listen for requests on the API gateway server