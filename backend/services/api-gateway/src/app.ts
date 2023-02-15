import express, {Request, Response, NextFunction, Application} from "express";
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import { StatusCodes } from "http-status-codes";

const app: Application = express();

const API_PRODUCTS_ENDPOINT = `http://localhost:5404/api/products`;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: "*"
}))

app.get('/', async (request: any, response: Response, next: NextFunction): Promise<any> => {
    return response.status(StatusCodes.OK).json({success: true, message: "API Gateway Entrypoint"});
})

// Mock Route to fetch all products
app.get('/api/products', async (request: Request, response: Response, next: NextFunction): Promise<any> => {

    const productsResponse = await axios.get(API_PRODUCTS_ENDPOINT);
    const resHeaders = productsResponse.headers;
    console.log(productsResponse);

    return response.status(StatusCodes.OK).json({success: true, data: productsResponse.data});
})

export {app};