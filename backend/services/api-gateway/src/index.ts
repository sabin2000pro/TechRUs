require('dotenv').config();
import {app} from './app'
import {logInfo} from './api-gateway-logger';

const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 5410;
const API_GATEWAY_DEV_MODE = process.env.API_GATEWAY_DEV_MODE || 'development'

const logger = logInfo();


export const listenApiGatewayServer = () => {

    try {

        return app.listen(API_GATEWAY_PORT, () => {
            console.log(`API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`)
            logger.info(`API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`)
          });
        
    } 
    
    catch(error) {

      if(error) {
          console.error(error);
          logger.error(error);
     }

    }

}

listenApiGatewayServer(); // listen for requests on the API gateway server