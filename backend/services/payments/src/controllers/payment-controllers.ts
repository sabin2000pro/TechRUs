import asyncHandler from 'express-async-handler';
require('dotenv').config();
import stripe from 'stripe'
import { IPaymentsParams } from '../interface/payments-interface';

const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ""

export const createNewPayment = asyncHandler(async (request, response, next) => {
    
})

export const fetchClientSecretKey = asyncHandler(async (request, response, next) => {

})