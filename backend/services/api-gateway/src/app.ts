import express, {Request, Response, NextFunction} from "express";
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Mock Route to fetch all products
app.get('/api/products', async (request: Request, response: Response, next: NextFunction) => {
    const products = await axios.get(`http://localhost:5404/api/products`);
    const data = products.data;

    console.log(data);
})

export {app};