require('dotenv').config()
import { app } from "./app"

const EVENT_BUS_PORT = process.env.EVENT_BUS_PORT || 6500;
const EVENT_BUS_DEV_MODE = process.env.EVENT_BUS_DEV_MODE || 'development'

// Start of authentication server
export const startEventBusServer = async () => {

      return app.listen(EVENT_BUS_PORT, () => {
         console.log(`Event Bus Service Server is listening for requests on port ${EVENT_BUS_PORT} in mode: ${EVENT_BUS_DEV_MODE}`);
      });

}

startEventBusServer()