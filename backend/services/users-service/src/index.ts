require('dotenv').config();
import { app } from "./app"

const USERS_SERVICE_PORT = process.env.USERS_SERVICE_PORT || 5420;

// Start of authentication server
export const startUserServer = async () => {

      return app.listen(USERS_SERVICE_PORT, () => {
        console.log(`Users Service is listening for requests on port ${USERS_SERVICE_PORT} in mode: ${process.env.USERS_DEV_MODE}`);
      });

}

startUserServer();