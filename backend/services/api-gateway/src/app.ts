import express, {Response, NextFunction, Application} from "express";
import cors from 'cors';
import morgan from 'morgan';
import { StatusCodes } from "http-status-codes";
import {apiGatewayRouter} from './routes/api-gateway-routes';

const app: Application = express();

if(process.env.API_GATEWAY_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors({
    origin: "*",
}))


app.use('/api/v1/api-gateway', apiGatewayRouter);

export {app};