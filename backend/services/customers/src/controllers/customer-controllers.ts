import { StatusCodes } from 'http-status-codes';
import { Customer } from "../models/customer-model";
import {Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';

export const fetchAllCustomers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {

    try {

        if(request.method === 'GET') {

            const customers = await Customer.find();

            if(!customers) {
                // Return an error response
            }

            return response.status(StatusCodes.OK).json({success: true, data: customers})

        }
      
    } 
    
    catch(error) {

      //Handle potential errors
      if(error) {
         return next(error);
      }


    }
})

export const fetchCustomerByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

       const customerId = request.params.customerId;

       if(!customerId) {

       }

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }


})

export const createNewCustomer = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {

    }
})

export const editCustomerByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }
})

export const deleteCustomerByID = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }
})

export const deleteCustomers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }
})

export const uploadCustomerAvatar = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }
})

export const updateProfileSettings = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }
})

export const fetchPopularCustomers = asyncHandler(async (request: any, response: Response, next: NextFunction): Promise<any> => {
    try {

    } 
    
    catch(error) {
        if(error) {
            return next(error);
         }
    }
})