const dotenv = require('dotenv');
dotenv.config({path: './config.env'})
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const categoriesPort = process.env.CATEGORIES_PORT || 5401

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: ["POST", "GET", 'POST']
}))

// Mount the Categories API endpoints

const categoriesServer = app.listen(categoriesPort, (error) => {
    
    try {

        if(!error) {
            return console.log(`Categories Service Server listening for requests on port ${categoriesPort} in mode: ${process.env.NODE_ENV}`)
        }

    }
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }
})

module.exports = categoriesServer;