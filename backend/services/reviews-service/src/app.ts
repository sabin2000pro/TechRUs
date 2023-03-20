require('dotenv').config();
import express, {Application, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { reviewsRouter } from './routes/review-routes';
import {StatusCodes} from 'http-status-codes';

const app: Application = express();

app.use(express.json());

if(process.env.REVIEWS_NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

app.get('/', async (request: any, response: Response, next: NextFunction): Promise<any> => {
    
    try {
        return response.status(StatusCodes.OK).json({success: true, message: "Reviews Service Root Route"});
    } 
    
    catch(error) {

      if(error) {
         return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message});
      }

    }

})

app.use('/api/v1/reviews', reviewsRouter); // Mount the reviews router

export {app};