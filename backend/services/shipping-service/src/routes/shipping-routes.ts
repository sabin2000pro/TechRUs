import express from 'express';
export const shippingRouter = express.Router();
import { fetchShippingDetailsByID, fetchShippingDetails, createNewShipping, deleteShippingDetailsByID, editShippingDetails, editShippingStatus } from '../controllers/shipping-controller';

shippingRouter.route('/').get(fetchShippingDetails).post(createNewShipping);
shippingRouter.route('/:id').get(fetchShippingDetailsByID).delete(deleteShippingDetailsByID);

shippingRouter.route('/:id/update-status').put()