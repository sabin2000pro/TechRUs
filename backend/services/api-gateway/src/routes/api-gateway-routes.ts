import express from 'express';
export const apiGatewayRouter = express.Router();
import {fetchUserOrders, createProductWithAuthUser} from '../controllers/api-gateway-controllers';

apiGatewayRouter.route('/customer-orders').get(fetchUserOrders);
apiGatewayRouter.route('/get-user').get(createProductWithAuthUser)