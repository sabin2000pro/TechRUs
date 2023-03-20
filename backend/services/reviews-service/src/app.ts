require('dotenv').config();
import express, {Application, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { reviewsRouter } from './routes/review-routes';

const app: Application = express();

app.use(express.json());

if(process.env.REVIEWS_NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))


app.use('/api/v1/reviews', reviewsRouter); // Mount the reviews router

export {app};