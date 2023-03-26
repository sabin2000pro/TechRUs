import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import {Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

const LOGGED_IN_USER_ENDPOINT = `http://auth-service:5400/api/v1/auth/me`

export const fetchUserOrders = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
      const authorization = request.headers;
      const loggedInUserResponse = await axios.get(LOGGED_IN_USER_ENDPOINT, {headers: {Authorization: authorization} })

      console.log(`Logged In user Response : `, loggedInUserResponse);

      // Extract the user ID from the logged-in user response
      const userId = loggedInUserResponse.data._id;

      console.log(`User ID : `, userId);

  
      return response.status(StatusCodes.OK).json({success: true});
})

export const fetchProductReviews = asyncHandler( async( request: any, response: Response, next: NextFunction): Promise<any> => {

})