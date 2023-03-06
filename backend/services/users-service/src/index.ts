require('dotenv').config();
import { app } from "./app"

const CUSTOMERS_SERVICE_PORT = process.env.CUSTOMERS_SERVICE_PORT || 5420;

// Start of authentication server
export const startCustomersServer = async () => {

      return app.listen(CUSTOMERS_SERVICE_PORT, () => {
        console.log(`Coupons Service Server is listening for requests on port ${CUSTOMERS_SERVICE_PORT} in mode: ${process.env.CUSTOMERS_DEV_MODE}`);
      });

}

startCustomersServer();