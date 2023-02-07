require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5400

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

app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());