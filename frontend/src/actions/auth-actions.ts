import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, VERIFY_USER_EMAIL_REQUEST, VERIFY_USER_EMAIL_SUCCESS, VERIFY_USER_EMAIL_FAIL, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS } from './../constants/auth-constants';
import {processConfigHeader} from '../headers'
import { fetchTokenFromSessionStorage } from '../fetch-auth-token';
import axios from 'axios';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOAD_USER_FAIL } from '../constants/auth-constants';

export const register = (username: string, email: string, password: string) => async (dispatch) => {

    try {

        dispatch({type: REGISTER_USER_REQUEST})
        const config = processConfigHeader();

        const {data} = await axios.post(`http://localhost:5400/api/v1/auth/register`, {username, email, password}, config);
        
        dispatch({type: REGISTER_USER_SUCCESS, payload: data});
    } 
    
    catch(error) {

        if(error) {
            dispatch({type: REGISTER_USER_FAIL, payload: error.data.response.message});
        }
    }

} 

export const logout = () => async (dispatch) => {

    try {
        dispatch({type: LOGOUT_USER_REQUEST})

        const config = processConfigHeader();

        await axios.get(`http://localhost:5400/api/v1/auth/logout`, config);

        dispatch({type: LOGOUT_USER_SUCCESS});
        sessionStorage.clear();       // Clear session storage
    } 
    
    catch(error) {

      if(error) {
         dispatch({type: LOGOUT_USER_FAIL, payload: error.data.response.message});
      }

    }


}

export const verifyEmailAddress = (userId: string, userOTP: string) => async (dispatch) => {

    try {

       dispatch({type: VERIFY_USER_EMAIL_SUCCESS});
       const config = processConfigHeader();

       const {data} = await axios.post(`http://localhost:5400/api/v1/auth/verify-email`, {userId, userOTP}, config);
       console.log("`E-mail Verification Data : ", data);


    } 
    
    catch(error) {

      if(error) {
    
      }

    }

}

export const verifyLoginCode = (userId: string, mfaToken: string) => async (dispatch) => {
    try {

    } 
    
    catch(error) {

    }

}    
    
// @description: This function acts as an action that will be invoked from the Login component which allows the user to login
// @parameters: (email): Stores the e-mail of the customer here. (password): Stores the customers inputted password

export const login = (email: string, password: string) => async (dispatch) => {

    try {

        dispatch({type: LOGIN_USER_REQUEST});
        const config = processConfigHeader();

        const {data} = await axios.post(`http://localhost:5400/api/v1/auth/login`, {email, password}, config);
        dispatch({type: LOGIN_USER_SUCCESS, payload: data.user}); // When the user has logged in successfully, store the user data in the payload

        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("user", JSON.stringify(data.user));
    } 
    
    catch(error) {
        
      if(error) {
        console.error(`Login Error : `, error.response.data.message);
        dispatch({type: LOGIN_USER_FAIL, payload: error.response.data.message});
      }

    }


} 

export const fetchLoggedInUser = () => async (dispatch) => {

    try {

        dispatch({type: LOAD_USER_REQUEST})
        const token = JSON.parse(sessionStorage.getItem("token") as any);
        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}};

        const {data} = await axios.get(`http://localhost:5400/api/v1/auth/me`, config);
        console.log(`Logged In User : `, data);

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } 
    
    catch(error) {

      if(error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.data.response.message});
      }


    }


} 

export const forgotPassword = (email: string) => async (dispatch) => {

    try {
        
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        
        const config = processConfigHeader();
        const {data} = await axios.post(`http://localhost:5400/api/v1/auth/forgot-password`, {email}, config);
        const message = data.message;

        console.log(`Forgot Password Data : `, data);
        console.log(`Forgot password message : `, message);

        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: message});
    }     
    
    catch(error) {

      if(error) {

        if(error) {

            console.log(`Forgot Password Error : `, error);
            dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.data.response.message});
          }
      }

    }


}

export const resetPassword = (email: string) => async (dispatch) => {
    try {

    } 
    
    catch(error) {

    }

}

export const updatePassword = (currentPassword: string, newPassword: string) => async (dispatch) => {
    try {

    } 
    
    catch(error) {

    }

}

export const updateCustomerWorkShfits = (currentStartShift, newStartShift, currentEndShift, newEndShift) => async (dispatch) => {

}