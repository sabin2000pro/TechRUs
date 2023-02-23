import express from 'express';
export const apiGatewayRouter = express.Router();
import {fetchCustomerOrders} from '../controllers/api-gateway-controllers';

apiGatewayRouter.route('/customer-orders').get(fetchCustomerOrders);