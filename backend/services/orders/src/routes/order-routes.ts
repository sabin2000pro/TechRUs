import express from 'express';

export const orderRouter = express.Router();
import { fetchAllOrders, createNewOrder, updateOrderStatus } from '../controllers/orders-controller';

orderRouter.route('/').get(fetchAllOrders).post(createNewOrder);
orderRouter.route('/:id/update-status').put(updateOrderStatus)