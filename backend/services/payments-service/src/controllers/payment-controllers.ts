require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import stripe from 'stripe'
import { IPaymentIntent } from '../interface/payments-interface';
import {Response, NextFunction} from 'express';

const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ""
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || ""
const stripeClient = new stripe(STRIPE_API_KEY, {apiVersion: '2022-11-15'});

export const createNewPayment = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    const currPaymentData: IPaymentIntent = request.body;
    console.log(`The current payment data charged : `, currPaymentData);

    try {

      const paymentIntent: any = await stripeClient.paymentIntents.create({
        amount: currPaymentData.amount,
        currency: currPaymentData.currency,
        payment_method_types: [currPaymentData.paymentMethod],
        metadata: {integration_check: 'accept_a_payment'}
      });

      const client_secret = paymentIntent.client_secret;

      console.log(`The client secret : `, client_secret);

    return response.status(StatusCodes.CREATED).json({success: true, client_secret});
    
    } 
    
    catch(error) {

       if(error) {
            // Send back error response
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message});
       }

    }


})

export const fetchClientSecretKey = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<Response | any> => {

    if(STRIPE_API_KEY !== undefined && request.method === "GET") {
        return response.status(StatusCodes.OK).json({success: true, client_secret: STRIPE_API_KEY});
    }

})

export const fetchClientPublishableKey = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<Response | any> => {
    return response.status(StatusCodes.OK).json({success: true, publishable_key: STRIPE_PUBLISHABLE_KEY});
})