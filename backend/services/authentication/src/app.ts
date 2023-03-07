require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import { verifyUserAuthentication } from '../src/middleware/verify-user-auth';
import express, {Application} from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean'
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import {errorHandler} from './middleware/error-handler'
import {authRouter} from './routes/auth-routes'

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

app.use(cookieSession({
    keys: ["key1", 'key2']
}))

app.get('/', verifyUserAuthentication, (request, response, next) => {
    return response.status(StatusCodes.OK).json({success: true, message: "Auth Root Route"})
})

// Mount security middleware
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());

app.use('/api/auth', authRouter);
app.use(errorHandler);

export {app};