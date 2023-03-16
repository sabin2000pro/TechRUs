import express from 'express';

export const orderRouter = express.Router();
import { fetchAllOrders, createNewOrder, udpateOrderStatus } from '../controllers/orders-controller';

orderRouter.route('/').get(fetchAllOrders).post(createNewOrder);