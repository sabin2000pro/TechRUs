import express from 'express';
import { fetchAllCustomers, fetchCustomerByID, editCustomerShifts, createNewCustomer, deleteCustomerByID } from '../controllers/customer-controllers';

export const customerRouter = express.Router();

customerRouter.route('/').get(fetchAllCustomers).post(createNewCustomer)
customerRouter.route('/:customerId').get(fetchCustomerByID).put(editCustomerShifts).delete(deleteCustomerByID);