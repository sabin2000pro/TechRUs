require('dotenv').config();
import {app} from './app';

const PRODUCT_SERVICE_PORT = process.env.PRODUCT_SERVICE_PORT || 5404;

export const listenProductsServer = () => { // Create the product server to handle GET, POST, DELETE, PUT request 
    
    try {    

        return app.listen(PRODUCT_SERVICE_PORT, () => {
            console.log(`Product Microservice Service is listening for incoming requests on port ${PRODUCT_SERVICE_PORT} in mode: ${process.env.PRODUCTS_SERVICE_PORT}`);
        })

    } 
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }

}

listenProductsServer();