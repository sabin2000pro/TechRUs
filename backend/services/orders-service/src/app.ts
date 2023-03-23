require('dotenv').config();
import { connectOrdersSchema } from './database/orders-schema';
import {errorHandler} from './middleware/error-handler';
import { orderRouter } from './routes/order-routes';
import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();

connectOrdersSchema();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ["POST", "GET", 'DELETE', "PATCH", "PUT"]
}))

if(process.env.ORDERS_SERVICE_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/orders', orderRouter);
app.use(errorHandler)

export {app}