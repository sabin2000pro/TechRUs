const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5400
const {connectAuthDatabase} = require('./database/auth-db');

connectAuthDatabase();

// Mount middleware
if(process.env.NODE_ENV === 'development') { // If we are in development mode, use the morgan logger package
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

app.use(cookieSession({
    keys: ["key1", 'key2']
}))

// Mount security middleware
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());

// Mount the auth routes below

const server = app.listen(port, (error) => {
    try {

        if(!error) {
            return console.log(`Auth service is listening for requests on port ${port} in mode ${process.env.NODE_ENV}`)
        }

    }
    
    catch(error) {

        if(error) {
            return console.error(error);
        }

    }

})

module.exports = server;