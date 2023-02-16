import { app } from "./app"
import dotenv from 'dotenv';
dotenv.config({path: "/Users/sabin2000/Documents/TechRUs/backend/services/coupons/config.env"});

const port = process.env.PORT || 5402;

// Start of authentication server
export const startCouponsServer = async () => {

      return app.listen(port, () => {
        console.log(`Coupons Service Server is listening for requests on port ${port} in mode: ${process.env.NODE_ENV}`);
      });

}

startCouponsServer();