import { orderRouter } from './routes/order-routes';
require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ["POST", "GET", 'DELETE', "PATCH", "PUT"]
}))

if(process.env.ORDERS_SERVICE_DEV_MODE === 'development') {
    app.use(morgan('dev'));
}

app.get('/', async (request, response, next) => {// Route to test the authentication middleware (WILL BE MOVED TO API GATEWAY)

    try {
        
        const responsePromise = await axios.get(`http://localhost:5400`, {headers: {Authorization: request.headers.authorization}}); // Route that requires authentication for fetching a list of orders    
        return response.status(StatusCodes.OK).json({success: true, responsePromise, message: "You are AUTHORIZED to access this route"});
    } 
    
    catch(error) {

      if(error) {
         return response.status(StatusCodes.UNAUTHORIZED).json({success: false, message: "Unauthorized to access the root route of auth"})
      }

    }
})

app.use('/api/v1/orders', orderRouter);
export {app}