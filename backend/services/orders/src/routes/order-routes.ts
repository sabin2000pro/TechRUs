import express from 'express';

export const orderRouter = express.Router();
import { fetchAllOrders, createNewOrder } from '../controllers/orders-controller';

orderRouter.route('/').get(fetchAllOrders).post(createNewOrder);