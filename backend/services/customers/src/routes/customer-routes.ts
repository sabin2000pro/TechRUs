import express from 'express';
import { fetchAllCustomers, fetchCustomerByID, editCustomerShifts, createNewCustomer } from '../controllers/customer-controllers';

export const customerRouter = express.Router();

customerRouter.route('/').get(fetchAllCustomers).post(createNewCustomer)
customerRouter.route('/:customerId').get(fetchCustomerByID).put(editCustomerShifts)