require('dotenv').config();
import { app } from "./app"

const ORDERS_SERVICE_PORT = process.env.ORDERS_SERVICE_PORT || 5403;

// Start of authentication server
export const startOrdersServer = async () => {

     try {
        return app.listen(ORDERS_SERVICE_PORT, () => {
            console.log(`Orders Service Service Server is listening for requests on port ${ORDERS_SERVICE_PORT} in mode: ${process.env.ORDERS_SERVICE_DEV_MODE}`);
         });
     }
     
     catch(error) {

       if(error) {
          return console.error(error);
       }

     }

}

startOrdersServer();