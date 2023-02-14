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
import { logInfo } from '../logger';

const app = express();
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

export {app};