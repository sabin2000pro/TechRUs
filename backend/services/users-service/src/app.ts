require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {userRouter} from './routes/user-routes';

const app = express();

app.use(express.json());

if(process.env.USERS_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: '*',
    methods: ["POST", "GET", 'POST']
}))

app.use('/api/v1/users', userRouter);

export {app}