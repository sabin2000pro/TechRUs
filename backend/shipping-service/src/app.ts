require('dotenv').config();
import express from 'express'
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());

if(process.env.REVIEWS_NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))
