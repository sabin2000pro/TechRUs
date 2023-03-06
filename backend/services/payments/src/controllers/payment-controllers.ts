import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
require('dotenv').config();
import stripe from 'stripe'
import { IPaymentsParams } from '../interface/payments-interface';
import {Response, NextFunction} from 'express';

const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ""
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || ""

export const createNewPayment = asyncHandler(async (request, response, next) => {
    const {} = request.body;
})

export const fetchClientSecretKey = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<Response | any> => {
    return response.status(StatusCodes.OK).json({success: true, client_secret: STRIPE_API_KEY});
})

export const fetchClientPublishableKey = asyncHandler(async (request: any, response: Response, next: NextFunction) => {

})