import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import {Response, NextFunction} from 'express';

const LOGGED_IN_USER_ENDPOINT = `http://auth-service:5400/api/v1/auth/me`
const COUPONS_ENDPOINT = `http://coupons-service:5477/api/v1/coupons`;
const USER_ORDERS_ENDPOINT = `http://orders-service:5403/api/v1/orders/my-orders`

export const fetchUserOrders = async (request: any, response: Response, next: NextFunction) => {
      const authorization = request.headers;
      const ordersResponse = await axios.get(USER_ORDERS_ENDPOINT, {headers: {Authorization: authorization} })
      return response.status(StatusCodes.OK).json({success: true, ordersResponse});
}

export const createProductWithAuthUser = async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        const authResponse = await axios.get(LOGGED_IN_USER_ENDPOINT, {headers: {Authorization: request.headers.authorization} // Get logged in user
  
      });    
  
      const userResponse = authResponse.data.user;
      const user = userResponse._id;
      const userEmail = userResponse.email;

      request.user = {_id: user, email: userEmail};
      return response.status(StatusCodes.OK).json({success: true, data: request.user});
    }
    
    catch(error) {

     if(error) {
        return console.error(error);
     }

    }


}