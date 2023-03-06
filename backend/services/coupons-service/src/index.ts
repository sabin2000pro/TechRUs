require('dotenv').config();
import { app } from "./app"

const COUPONS_SERVICE_PORT = process.env.COUPONS_SERVICE_PORT || 5402;

// Start of authentication server
export const startCouponsServer = async () => {

      return app.listen(COUPONS_SERVICE_PORT, () => {
           console.log(`Coupons Service Server is listening for requests on port ${COUPONS_SERVICE_PORT} in mode: ${process.env.NODE_ENV}`);
      });

}

startCouponsServer();