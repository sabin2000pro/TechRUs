require('dotenv').config();
import { app } from "./app"

const SHIPPING_SERVICE_PORT = process.env.SHIPPING_SERVICE_PORT || 5411;

// Start of authentication server
export const startShippingServer = async () => {

     try {
        return app.listen(SHIPPING_SERVICE_PORT, () => {
            console.log(`Orders Service Service Server is listening for requests on port ${SHIPPING_SERVICE_PORT} in mode: ${process.env.SHIPPING_SERVICE_PORT}`);
         });
     }
     
     catch(error) {

       if(error) {
          return console.error(error);
       }

     }

}

startShippingServer();