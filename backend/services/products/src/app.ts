require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {connectProductsSchema} from './database/products-db';
import {productRouter} from './routes/product-routes';

const app = express();

connectProductsSchema();

app.use(express.json());

if(process.env.PRODUCTS_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: '*',
    methods: ["POST", 'GET', "DELETE", "PUT", "PATCH"]
}))

app.use('/api/products', productRouter);

export {app}