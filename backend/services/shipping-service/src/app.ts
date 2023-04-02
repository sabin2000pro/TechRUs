require('dotenv').config();
import { shippingRouter } from './routes/shipping-routes';
import { connectShippingSchema } from './schema/shipping-schema';
import express from 'express'
import morgan from 'morgan';
import cors from 'cors';

const app = express();

connectShippingSchema(); // Invoke the connection to the shipping schema
app.use(express.json());

if(process.env.REVIEWS_NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "https://techrus.dev",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

app.use('/api/v1/shipping', shippingRouter);
export {app}