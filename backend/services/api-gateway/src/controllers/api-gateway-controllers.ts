import axios from 'axios';
import {Response, NextFunction} from 'express';

const ALL_PRODUCTS_SERVICE_URI = `http://localhost:5404`
const ALL_CATEGORIES_SERVICE_URI = `http://localhost:`

export const fetchCustomerOrders = async (request, response: Response, next: NextFunction) => {
    try {

      const ordersResponse = await axios.get(`http://localhost:5403/api/orders/list`);
      console.log(`Orders RESPONSE DATA : `, ordersResponse);


      return response.status(200).json({success: true, ordersResponse});
    } 
    
    catch(error) {
        if(error) {
            return console.error(error);
        }
    }

}

export const fetchAllProducts = async (request, response: Response, next: NextFunction) => {

}