require('dotenv').config();
import {app} from './app'
import {connectAuthDatabase} from './database/auth-db';
const AUTH_PORT = process.env.AUTH_PORT || 5400;
const AUTH_DEV_MODE = process.env.AUTH_DEV_MODE || 'development'

connectAuthDatabase();


export const startAuthServer = async () => {

    try {

        return app.listen(AUTH_PORT, () => {
            console.log(`The Authentication Service Live On Port ${AUTH_PORT} in mode: ${AUTH_DEV_MODE}`);
          });
    } 
    
    catch(error) {

      if(error) {
         return console.error(error);
     }

    }

}

startAuthServer(); // listen for requests on the API gateway server