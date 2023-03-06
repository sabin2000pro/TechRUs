import { StatusCodes } from 'http-status-codes';
require('dotenv').config();
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model'
import {Response, NextFunction} from 'express';

export const verifyUserAuthentication = async (request: any, response: Response, next:NextFunction) => {
    try {

        let token;

        if(!token) {
            return response.status(StatusCodes.UNAUTHORIZED).json({sucess: false, message: "You are unauthorized to access this resource"});
        }

        // Verify authorization header
        if(request.headers.authorization && request.headers.authorization.includes("Bearer")) {
            token = request.headers.authorization.split(" ")[1]; // Split by a space to take out the bearer token from the authorization header
        }

        const decoded: any = jwt.verify(token, process.env.JWT_TOKEN!);
        request.user = await User.findById(decoded._id);

        console.log(`Verified user : `, request.user);

        console.log(`Request user : `, request.user); // Log the currently logged in user

        return next();
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }


}