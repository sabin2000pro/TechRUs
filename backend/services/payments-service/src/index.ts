import {app} from './app';
import dotenv from 'dotenv';
dotenv.config({path: '/Users/sabin2000/Documents/TechRUs/backend/services/api-gateway/config.env'})

const PAYMENTS_SERVICE_PORT = process.env.PAYMENTS_SERVICE_PORT || 5406;
const PAYMENTS_SERVICE_NODE_ENV = process.env.PAYMENTS_SERVICE_NODE_ENV || 'development'

export const startPaymentsServer = () => {

    try {

        return app.listen(PAYMENTS_SERVICE_PORT, () => {
            console.log(`Payments Service server is listening for active requests on port ${PAYMENTS_SERVICE_PORT} in mode ${PAYMENTS_SERVICE_NODE_ENV}`)
          });
        
    } 
    
    catch(error) {

      if(error) {
          console.error(error);
     }

    }

}

startPaymentsServer();