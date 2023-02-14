import dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean'
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import {connectAuthDatabase} from './database/auth-db';
import {errorHandler} from './middleware/error-handler';
import { authRouter } from './routes/auth-routes';
import { logInfo } from './logger';

const app = express();
const authPort = process.env.AUTH_PORT || 5400
const logger = logInfo();

connectAuthDatabase();

// Mount middleware
if(process.env.NODE_ENV === 'development') { // If we are in development mode, use the morgan logger package
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

app.use(cookieSession({
    keys: ["key1", 'key2']
}))

// Mount security middleware
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());

app.use('/api/auth', authRouter);
app.use(errorHandler);

export const authServer = app.listen(authPort, () => {

    try {

        console.log(`Authentication service is listening for requests on port ${authPort} in mode : ${process.env.NODE_ENV}`)
        return logger.info(`The authentication service is listening for requests on port ${authPort} in mode ${process.env.NODE_ENV}`);
    }
    
    catch(error) {

        if(error) {
            return logger.error(`Server could not listen for requests on port ${authPort} in mode ${process.env.NODE_ENV} - ${error.message}`);
        }

    }

})