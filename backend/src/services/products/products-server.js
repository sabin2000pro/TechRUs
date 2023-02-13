const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();
const productPort = process.env.PRODUCT_PORT || 5404

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: '*',
    methods: ["POST", 'GET', "DELETE", "PUT", "PATCH"]
}))

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

process.on('uncaughtException', (promise, err) => {

})

module.exports = productServer;