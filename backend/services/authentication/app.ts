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
const {errorHandler} = require('./middleware/error-handler');
const authRoutes = require('./routes/auth-routes');
const {logInfo} = require('./logger');
const logger = logInfo();

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


app.use(errorHandler);

const server = app.listen(port, (error) => {

    try {

        if(!error) {
            console.log(`Authentication service is listening for requests on port ${port} in mode : ${process.env.NODE_ENV}`)
            return logger.info(`The authentication service is listening for requests on port ${port} in mode ${process.env.NODE_ENV}`);
        }

    }
    
    catch(error) {

        if(error) {
            return logger.error(`Server could not listen for requests on port ${port} in mode ${process.env.NODE_ENV} - ${error.message}`);
        }

    }

})

module.exports = server;