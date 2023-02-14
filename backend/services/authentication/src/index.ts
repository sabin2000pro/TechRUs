import dotenv from 'dotenv';
import {app} from './app'
dotenv.config({path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env'})

const AUTH_PORT = process.env.AUTH_PORT || 5400;
const AUTH_DEV_MODE = process.env.AUTH_DEV_MODE || 'development'

export const startAuthServer = () => {

    try {

        return app.listen(AUTH_PORT, () => {
            console.log(`Authentication Service Live On Port 5299 in mode: ${process.env.NODE_ENV}`);
          });
    } 
    
    catch(error) {

      if(error) {
         return console.error(error);
     }

    }

}

startAuthServer(); // listen for requests on the API gateway server