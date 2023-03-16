import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import {Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

const LOGGED_IN_USER_ENDPOINT = `http://auth-service:5400/api/v1/auth/me`
const COUPONS_ENDPOINT = `http://coupons-service:5477/api/v1/coupons`;
const USER_ORDERS_ENDPOINT = `http://orders-service:5403/api/v1/orders`

export const fetchUserOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
      const authorization = request.headers;
      const loggedInUserResponse = await axios.get(LOGGED_IN_USER_ENDPOINT, {headers: {Authorization: authorization} })

      console.log(`Logged In user Response : `, loggedInUserResponse);
  
      return response.status(StatusCodes.OK).json({success: true});
})