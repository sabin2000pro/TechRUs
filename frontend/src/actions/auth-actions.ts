import axios from 'axios';
import { REGISTER_CUSTOMER_REQUEST, REGISTER_CUSTOMER_SUCCESS, REGISTER_CUSTOMER_FAIL, LOGIN_CUSTOMER_REQUEST, LOGIN_CUSTOMER_SUCCESS, LOGIN_CUSTOMER_FAIL } from '../constants/auth-constants';

const fetchTokenFromSessionStorage = () => {
    const token = JSON.parse(sessionStorage.getItem("token") as any);
}

const processConfigHeader = () => {
    const config = {headers: {'Content-Type': 'application/json'}};

    return config
}

export const register = (username: string, email: string, password: string) => async (dispatch) => {

    try {
        dispatch({type: REGISTER_CUSTOMER_REQUEST})

        const config = processConfigHeader();

        const {data} = await axios.post(`http://localhost:5400/api/v1/auth/register`, {username, email, password}, config);
        
        dispatch({type: REGISTER_CUSTOMER_SUCCESS, payload: data});
    } 
    
    catch(error) {

        if(error) {
            console.error(`Register Error : `, error);
            dispatch({type: REGISTER_USER_FAIL, payload: error.data.response.message});
        }
    }

} 

export const verifyCustomerEmail = (customerId: string, OTP: string) => async (dispatch) => {
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
        console.log(`User : `, data);

        dispatch({type: LOGIN_CUSTOMER_SUCCESS, payload: data});
    } 
    
    catch(error) {
        
      if(error) {

        console.error(`Login Error : `, error);
        dispatch({type: REGISTER_USER_FAIL, payload: error.data.response.message});
      }

    }


} 

export const fetchLoggedInCustomer = () => async (dispatch) => {

    try {
    
    } 
    
    catch(error) {

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