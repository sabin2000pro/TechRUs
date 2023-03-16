import express from 'express';
export const apiGatewayRouter = express.Router();
import {fetchUserOrders} from '../controllers/api-gateway-controllers';

apiGatewayRouter.route('/my-orders').get(fetchUserOrders);
