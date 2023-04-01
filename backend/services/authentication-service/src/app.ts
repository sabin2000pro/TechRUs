require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import { verifyUserAuthentication } from './middleware/verify-user-auth';
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

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use(cors({
    origin: ['http://207.154.209.57', 'http://localhost:3000'],
    methods: ["POST", 'GET', "DELETE", "PUT", "PATCH"]
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

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

export {app};