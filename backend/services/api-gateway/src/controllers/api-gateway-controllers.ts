import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import {Response, NextFunction} from 'express';

export const fetchUserOrders = async (request: any, response: Response, next: NextFunction) => {
      const ordersResponse = await axios.get(`http://localhost:5403/api/orders/list`);
      return response.status(StatusCodes.OK).json({success: true, ordersResponse});
}

export const createProductWithAuthUser = async (request: any, response: Response, next: NextFunction): Promise<any> => {
    request.user = {id: request.user._id, email: request.user.email};

    const authResponse = await axios.get('http://localhost:5400/api/v1/auth/me', {

      headers: {
        Authorization: request.headers.authorization
      }

    });

    const data = authResponse.data;
    console.log(data);

    console.log(`Auth Response for logg in user : `, authResponse);
    return response.status(StatusCodes.OK).json({success: true, message: "user fetched"});
}