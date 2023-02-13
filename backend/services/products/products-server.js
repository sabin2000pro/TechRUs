const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const morgan = require('morgan');
const express = require('express');
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

const productServer = app.listen(productPort, (error) => { // Create the product server to handle GET, POST, DELETE, PUT request 

    try {

        if(!error) {
            return console.log(`Product server listening for requests on port ${productPort} in mode: ${process.env.NODE_ENV}`);
        }

        else {
            return console.log(`Products server cannot listen for incoming requests`)
        }

    } 
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }

})

module.exports = productServer;