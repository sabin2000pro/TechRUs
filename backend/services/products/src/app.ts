import dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import express from 'express';
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const productPort = process.env.PRODUCTS_PORT || 5404
const {connectProductsSchema} = require('./database/products-db');
const productRoutes = require('./routes/product-routes');

connectProductsSchema();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: '*',
    methods: ["POST", 'GET', "DELETE", "PUT", "PATCH"]
}))

app.use('/api/products', productRoutes);


export {app}