import { app } from "./app"
import dotenv from 'dotenv';
dotenv.config({path: "backend/services/authentication/config.env"});

const port = process.env.PORT || 5401;

// Start of authentication server
export const startCategoriesServer = async () => {

      return app.listen(port, () => {
        console.log(`Categories Service Server is listening for requests on port ${port} in mode: ${process.env.NODE_ENV}`);
      });

}

startCategoriesServer()