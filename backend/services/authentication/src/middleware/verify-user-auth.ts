import { StatusCodes } from 'http-status-codes';
require('dotenv').config();
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model'
import {Response, NextFunction} from 'express';
import { ErrorResponse } from '../utils/error-response';

export const verifyUserAuthentication = async (request: any, response: Response, next:NextFunction) => {
  
    try {

        let token;

        // Verify authorization header
        if(request.headers.authorization && request.headers.authorization.includes("Bearer")) {
            token = request.headers.authorization.split(" ")[1]; // Split by a space to take out the bearer token from the authorization header
        }

        if(!token) {
          return response.status(StatusCodes.UNAUTHORIZED).json({sucess: false, message: "You are unauthorized to access this resource"});
      }


        const decoded: any = jwt.verify(token, process.env.JWT_TOKEN!);
        request.user = await User.findById(decoded._id);
        console.log(`Decoded : `, decoded);

        return next();
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }


}

export const restrictRolesTo = (...roles) => {

  return (request, response, next) => {

     if(!request.user.role.includes(roles)) { // Check if the user holds the current role
        return next(new ErrorResponse(`You are unauthorized to perform this action. You do not hold the right role`, StatusCodes.FORBIDDEN));
     }

     return next();
  }

}