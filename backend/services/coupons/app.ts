import dotenv from 'dotenv';
dotenv.config({path: './config.env'})
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: '*',
    methods: ["POST", "GET", 'POST']
}))


export {app}