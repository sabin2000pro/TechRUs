require('dotenv').config();
import { connectOrdersSchema } from './database/orders-schema';
import { orderRouter } from './routes/order-routes';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

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

export {app}