require('dotenv').config();
import { app } from "./app"

const port = process.env.CUSTOMERS_SERVICE_PORT || 5420;

// Start of authentication server
export const startCustomersServer = async () => {

      return app.listen(port, () => {
        console.log(`Coupons Service Server is listening for requests on port ${port} in mode: ${process.env.CUSTOMERS_DEV_MODE}`);
      });

}

startCustomersServer();