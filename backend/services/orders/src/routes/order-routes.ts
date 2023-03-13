import express from 'express';

export const orderRouter = express.Router();
import { fetchAllOrders } from '../controllers/orders-controller';