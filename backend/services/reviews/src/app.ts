import express, {Application, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
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
        return response.status(StatusCodes.OK).json({success: true, message: "Reviews Service Root"});
    } 
    
    catch(error) {

      if(error) {
         return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message});
      }

    }

})

// app.use('/api/auth', authRouter);

export {app};