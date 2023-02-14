import {app} from './app'
import dotenv from 'dotenv';
dotenv.config({path: '../'})

const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 6000;
const API_GATEWAY_DEV_MODE = process.env.API_GATEWAY_DEV_MODE || 'development'

export const listenApiGatewayServer = () => {

    try {
        return console.log(`API Gateway server is listening on port ${API_GATEWAY_PORT} in mode ${API_GATEWAY_DEV_MODE}`)
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
     }


    }

}

listenApiGatewayServer();