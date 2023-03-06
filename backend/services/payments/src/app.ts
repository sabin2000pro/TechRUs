import express, {Application, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {StatusCodes} from 'http-status-codes'
import {paymentRouter} from './routes/payment-routes';

const app: Application = express();



app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

app.get('/', async (request: any, response: Response, next: NextFunction): Promise<any> => {
    
    try {
        return response.status(StatusCodes.OK).json({success: true, message: "Payments Service Root Route"});
    } 
    
    catch(error) {

      if(error) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message});
      }

    }

})

app.use('/api/v1/payments', paymentRouter); // Mount the payment routes as middleware

export {app};