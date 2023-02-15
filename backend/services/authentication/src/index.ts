require('dotenv').config();
import {app} from './app'
import {connectAuthDatabase} from './database/auth-db';

connectAuthDatabase();

const AUTH_PORT = process.env.AUTH_PORT || 5400;
const AUTH_DEV_MODE = process.env.AUTH_DEV_MODE || 'development'

export const startAuthServer = async () => {

    try {

        return app.listen(AUTH_PORT, () => {
            console.log(`The Authentication Service Live On Port ${AUTH_PORT} in mode: ${process.env.NODE_ENV}`);
          });
    } 
    
    catch(error) {

      if(error) {
         return console.error(error);
     }

    }

}

startAuthServer(); // listen for requests on the API gateway server