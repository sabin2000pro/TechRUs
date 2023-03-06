import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from './../constants/auth-constants';
import axios from 'axios';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOAD_USER_FAIL } from '../constants/auth-constants';

const fetchTokenFromSessionStorage = () => {
    const token = JSON.parse(sessionStorage.getItem("token") as any);
    return token;
}

const processConfigHeader = () => {
    const config = {headers: {'Content-Type': 'application/json'}};

    return config
}

export const register = (username: string, email: string, password: string) => async (dispatch) => {

    try {

        dispatch({type: REGISTER_USER_REQUEST})
        const config = processConfigHeader();

        const {data} = await axios.post(`http://localhost:5400/api/v1/auth/register`, {username, email, password}, config);
        
        dispatch({type: REGISTER_USER_SUCCESS, payload: data});
    } 
    
    catch(error) {

        if(error) {
            console.error(`Register Error : `, error);
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
  
    } 
    
    catch(error) {

      if(error) {
        console.error(`Logout User Error : `, error);
        dispatch({type: LOGOUT_USER_FAIL, payload: error.data.response.message});
      }

    }


}

export const verifyCustomerEmail = (userId: string, userOTP: string) => async (dispatch) => {

    try {

    } 
    
    catch(error) {

      if(error) {
    
      }

    }

}
    
// @description: This function acts as an action that will be invoked from the Login component which allows the user to login
// @parameters: (email): Stores the e-mail of the customer here. (password): Stores the customers inputted password

export const login = (email: string, password: string) => async (dispatch) => {

    try {

        dispatch({type: LOGIN_USER_REQUEST});
        const config = processConfigHeader();

        const {data} = await axios.post(`http://localhost:5400/api/v1/auth/login`, {email, password}, config);
        console.log(`User : `, data);

        dispatch({type: LOGIN_USER_SUCCESS, payload: data}); // When the user has logged in successfully, store the user data in the payload
    
        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("user", JSON.stringify(data.user));
    } 
    
    catch(error) {
        
      if(error) {
        console.error(`Login Error : `, error);
        dispatch({type: LOGIN_USER_FAIL, payload: error.data.response.message});
      }

    }


} 

export const fetchLoggedInUser = () => async (dispatch) => {

    try {
        dispatch({type: LOAD_USER_REQUEST})
        const token = JSON.parse(sessionStorage.getItem("token") as any);
        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}};

        const {data} = await axios.get(`http://localhost:5400/api/v1/auth/me`, config);

        console.log(`Logged in user data : `, data);

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } 
    
    catch(error) {

      if(error) {
        console.error(`Load Logged In User Error : `, error);
        dispatch({type: LOAD_USER_FAIL, payload: error.data.response.message});
      }


    }


} 

export const forgotPassword = (email: string) => async (dispatch) => {
    try {

    } 
    
    catch(error) {

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