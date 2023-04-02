import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, VERIFY_USER_EMAIL_REQUEST, VERIFY_USER_EMAIL_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, VERIFY_USER_EMAIL_FAIL, VERIFY_LOGIN_MFA_REQUEST, VERIFY_LOGIN_MFA_FAIL, VERIFY_LOGIN_MFA_SUCCESS } from './../constants/auth-constants';
import {processConfigHeader} from '../headers'
import { Dispatch } from 'redux';
import axios from 'axios';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOAD_USER_FAIL } from '../constants/auth-constants';
import { EDIT_USER_SHIFTS_SUCCESS, EDIT_USER_SHIFTS_REQUEST, EDIT_USER_SHIFTS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_FAIL, FETCH_SINGLE_USER_SUCCESS, FETCH_USERS_SUCCESS, FETCH_SINGLE_USER_FAIL, FETCH_SINGLE_USER_REQUEST, DELETE_SINGLE_USER_REQUEST, DELETE_SINGLE_USER_FAIL, DELETE_SINGLE_USER_SUCCESS } from './../constants/user-constants';
import { AUTH_URI_REGISTER, AUTH_URI_LOGIN, AUTH_URI_VERIFY_EMAIL, AUTH_URI_VERIFY_LOGIN, AUTH_URI_LOGOUT, AUTH_URI_FORGOT_PASSWORD, AUTH_URI_UPDATE_PASSWORD, AUTH_URI_ME } from './uri-helper';

// @description: This function is responsible for registering a new user on the techrus.dev platform. It takes the username, email and password of the user as RouteParameters
// @access: Public - No Authorization Required
// @returns: void - No value is returned from this function

export const register = (username: string, email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

        dispatch({type: REGISTER_USER_REQUEST})
        const config = processConfigHeader();

        const {data} = await axios.post(AUTH_URI_REGISTER, {username, email, password}, config);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        
        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } 
    
    catch(error) {

        if(error) {
            dispatch({type: REGISTER_USER_FAIL, payload: error.data.response.message});
        }
    }

} 

// @description: This function is responsible for logging out a user on the techrus.dev platform. It does not take in any parameters
// @access: Public - No Authorization Required
// @returns: void - No value is returned from this function

export const logout = () => async (dispatch: Dispatch): Promise<void> => {

    try {
        dispatch({type: LOGOUT_USER_REQUEST})

        const config = processConfigHeader();

        await axios.get(AUTH_URI_LOGOUT, config);
        dispatch({type: LOGOUT_USER_SUCCESS});
        sessionStorage.clear();       // Clear session storage
    } 
    
    catch(error) {

      if(error) {
         dispatch({type: LOGOUT_USER_FAIL, payload: error.data.response.message});
      }

    }


}

export const verifyEmailAddress = (userId: string, OTP: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

       dispatch({type: VERIFY_USER_EMAIL_REQUEST});
       const config = processConfigHeader();

       const {data} = await axios.post(AUTH_URI_VERIFY_EMAIL, {userId, OTP}, config);
       dispatch({type: VERIFY_USER_EMAIL_SUCCESS, payload: data.message});

    } 
    
    catch(error) {

      if(error) {
         dispatch({type: VERIFY_USER_EMAIL_FAIL, payload: error.data.response.message});
      }

    }

}
  
    
// @description: This function acts as an action that will be invoked from the Login component which allows the user to login
// @parameters: (email): Stores the e-mail of the customer here. (password): Stores the customers inputted password

export const login = (email: string, password: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

        dispatch({type: LOGIN_USER_REQUEST});
        const config = processConfigHeader();

        const {data} = await axios.post(AUTH_URI_LOGIN, {email, password}, config);
        dispatch({type: LOGIN_USER_SUCCESS, payload: data.user}); // When the user has logged in successfully, store the user data in the payload

        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("user", JSON.stringify(data.user));
    } 
    
    catch(error) {
        
      if(error) {
        dispatch({type: LOGIN_USER_FAIL, payload: error.response.data.message});
      }

    }

} 

export const verifyLoginMfa = (userId: string, mfaToken: string) => async (dispatch: Dispatch): Promise<void> => {

  try {

    dispatch({type: VERIFY_LOGIN_MFA_REQUEST});
    const {data} = await axios.post(AUTH_URI_VERIFY_LOGIN, {userId, mfaToken});

    dispatch({type: VERIFY_LOGIN_MFA_SUCCESS, payload: data.message});

  } 
  
  catch(error) {

     if(error) {
      dispatch({type: VERIFY_LOGIN_MFA_FAIL, payload: error.response.data.message})
     }
  }

}

export const fetchLoggedInUser = () => async (dispatch: Dispatch): Promise<void> => { // Authentication action responsible for fetching the currently logged in user on the platform

    try {

        dispatch({type: LOAD_USER_REQUEST})
        const token = JSON.parse(sessionStorage.getItem("token") as any);

        const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}};
        const {data} = await axios.get(AUTH_URI_ME, config);

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } 
    
    catch(error) {

      if(error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.data.response.message});
      }


    }

} 

export const forgotPassword = (email: string) => async (dispatch: Dispatch): Promise<void> => {

    try {
        
        dispatch({type: FORGOT_PASSWORD_REQUEST});

        const config = processConfigHeader();
        const {data} = await axios.post(`http://207.154.209.57/api/v1/auth/forgot-password`, {email}, config);
        const message = data.message;

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

export const resetPassword = (currentPassword: string, newPassword: string, resetToken: any) => async (dispatch: Dispatch): Promise<void> => {

    try {
      dispatch({type: RESET_PASSWORD_REQUEST});

      const {data} = await axios.put(`http://localhost:5400/api/v1/auth/reset-password/${resetToken}`, {currentPassword, newPassword});
      console.log(`Reset Password Data : `, data);

      dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.message});
    } 
    
    catch(error) {

     if(error) {
        console.log(`Reset Password Error : `, error);
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.data.response.message});
     }

    }

}


// @description: Frontend action which corresponds to the auth reducer that updates the user password.
// @parameters: Current user password: currentPassword && newPassword: The new user's password.
export const updatePassword = (currentPassword: string, newPassword: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

      dispatch({type: UPDATE_PASSWORD_REQUEST});

      const token = JSON.parse(sessionStorage.getItem("token") as any); // Parse the token stored in session storage
      const config = {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`}};

      const {data} = await axios.put(AUTH_URI_UPDATE_PASSWORD, {currentPassword, newPassword}, config);
      dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.message})
    } 
    
    catch(error) {

      if(error) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.data.response.message});
      }

    }

}

export const updateUserShifts = (id: string, newStartShiftDate: Date, newEndShiftDate: Date) => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: EDIT_USER_SHIFTS_REQUEST});

       const {data} = await axios.put(`http://localhost:5400/api/v1/auth/users/${id}/update-shifts`, {newStartShiftDate, newEndShiftDate});
       console.log(`Updated staff user shifts : `, data);

       dispatch({type: EDIT_USER_SHIFTS_SUCCESS, payload: data});
    } 
    
    catch(error) {

      if(error) {
        console.error(`Updating User Shifts Error : `, error);
        dispatch({type: EDIT_USER_SHIFTS_FAIL, payload: error.data.response.message});
      }

    }

}

// @description: reducer function that fetches all registered users in the authentication database 
export const fetchAllUsers = () => async (dispatch: Dispatch): Promise<void> => {

   try {
    
     dispatch({type: FETCH_USERS_REQUEST});
     const {data} = await axios.get(`http://localhost:5400/api/v1/auth/users`);

     dispatch({type: FETCH_USERS_SUCCESS, payload: data.users});
   } 
   
   catch(error) {
     dispatch({type: FETCH_USERS_FAIL, payload: error.data.response.message});
   }

}

export const fetchUserByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

        dispatch({type: FETCH_SINGLE_USER_REQUEST});
        const {data} = await axios.get(`http://localhost:5400/api/v1/auth/users/${id}`); // Send GET request to fetch the user
        dispatch({type: FETCH_SINGLE_USER_SUCCESS, payload: data.user})
    } 
    
    catch(error) {

      if(error) {
         dispatch({type: FETCH_SINGLE_USER_FAIL, payload: error.data.response.message});
      }
    }

}

export const deleteUserByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {

  try {
    
     dispatch({type: DELETE_SINGLE_USER_REQUEST});

     const {data} = await axios.delete(`http://localhost:5400/api/v1/auth/users/${id}`);
     console.log(`Delete User Data : `, data);

     dispatch({type: DELETE_SINGLE_USER_SUCCESS, payload: data.message});

  }
  
  catch(error) {

    if(error) {
       dispatch({type: DELETE_SINGLE_USER_FAIL, payload: error.data.response.message});
    }

  }

}