import express from 'express';
export const shippingRouter = express.Router();

import { fetchShippingDetailsByID, fetchShippingDetails, createNewShipping, editShippingDetails, editShippingStatus, deleteShippingDetails } from '../controllers/shipping-controller';

shippingRouter.route('/').get(fetchShippingDetails).post(createNewShipping).delete(deleteShippingDetails)
shippingRouter.route('/:id').get(fetchShippingDetailsByID);

shippingRouter.route('/:id/update-status').put(editShippingStatus)