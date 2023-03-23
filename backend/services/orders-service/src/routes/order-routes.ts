import express from 'express';

export const orderRouter = express.Router();
import { fetchAllOrders, createNewOrder, updateOrderStatus, deleteOrders, deleteSingleOrderByID, fetchSingleOrderByID } from '../controllers/orders-controller';

orderRouter.route('/').get(fetchAllOrders).post(createNewOrder).delete(deleteOrders)
orderRouter.route('/:id').get(fetchSingleOrderByID).delete(deleteSingleOrderByID);
orderRouter.route('/:id/update-status').put(updateOrderStatus);