import axios from 'axios';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../constants/auth-constants';

const fetchTokenFromSessionStorage = () => {
    const token = JSON.parse(sessionStorage.getItem("token") as any);
}

export const register = (username: string, email: string, password: string) => async (dispatch) => {

    try {
        dispatch({type: REGISTER_USER_REQUEST})
        const config = {headers: {'Content-Type': 'application/json'}};
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
    
// @description: This function acts as an action that will be invoked from the Login component which allows the user to login
// @parameters: (email): Stores the e-mail of the customer here. (password): Stores the customers inputted password

export const login = (email: string, password: string) => async (dispatch) => {

    try {
    
    } 
    
    catch(error) {
        
      if(error) {
        
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