import { Dispatch } from 'redux';
import { EDIT_SHIPPING_INFO_REQUEST, EDTI_SHIPPING_STATUS_REQUEST, EDIT_SHIPPING_INFO_SUCCESS, FETCH_SHIPPING_INFO_REQUEST, FETCH_SHIPPING_INFO_FAIL, FETCH_SHIPPING_INFO_SUCCESS } from './../constants/shipping-constants';
import { SAVE_SHIPPING_INFO_REQUEST, SAVE_SHIPPING_INFO_SUCCESS, SAVE_SHIPPING_INFO_FAIL } from "../constants/shipping-constants";
import axios from 'axios';


// @description: Redux action which is responsible for sending a POST request to the shipping microservice endpoint to create a resource
// @method: POST
// @parameters: The user's shipping address, city, country, post code and phone number
export const createNewShipping = (user: any, address: string, city: string, country: string, postalCode: string, phoneNo: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

        dispatch({type: SAVE_SHIPPING_INFO_REQUEST});

        const {data} = await axios.post(`http://localhost:5411/api/v1/shipping`, {user, address, city, country, postalCode, phoneNo})
        console.log(`Shipping Data : `, data);
        localStorage.setItem("shippingInfo", JSON.stringify(data.shipping)); // We will store the shipping information in local storage to be used for creating an order.

        dispatch({type: SAVE_SHIPPING_INFO_SUCCESS, payload: data.shipping});
    } 
    
    catch(error) {

      if(error) {
        console.log(`Shipping Error : `, error);
        dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
      }

    }

}

export const editShippingDetails = (id: string, address: string, city: string, country: string, postalCode: string, phoneNo: string) => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: EDIT_SHIPPING_INFO_REQUEST});

       const {data} = await axios.put(`http://localhost:5411/api/v1/shipping/${id}`, {address, city, country, postalCode, phoneNo})

       dispatch({type: SAVE_SHIPPING_INFO_SUCCESS, payload: data.shipping})
    } 
    
    catch(error) {
        
        if(error) {
            dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
        }

    }

}

export const editShippingStatus = (id: string, currentStatus: string, newStatus: string) => async (dispatch: Dispatch): Promise<void> => {
  try {

     dispatch({type: EDTI_SHIPPING_STATUS_REQUEST});
     
     const {data} = await axios.put(`http://localhost:5411/api/v1/shipping/${id}/update-status`, {currentStatus, newStatus})
    
     console.log(`Edited  Shipping Data: `, data);
     dispatch({type: EDIT_SHIPPING_INFO_SUCCESS, payload: data.shipping})
  } 
  
  catch(error) {

    if(error) {
      dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
  }

  }


}

export const fetchAllShippingDetails = (keyword = '', page = 1) => async (dispatch: Dispatch): Promise<void> => {
  try {
     dispatch({type: FETCH_SHIPPING_INFO_REQUEST});

     const {data} = await axios.get(`http://localhost:5411/api/v1/shipping?keyword=${keyword}`);
     console.log(`Shipping Details :`, data);

     dispatch({type: FETCH_SHIPPING_INFO_SUCCESS, payload: data.shipping})
  } 
  
  catch(error) {

    if(error) {
      dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
    }

  }


}

export const fetchShippingDetailsByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch({type: FETCH_SHIPPING_INFO_REQUEST});

    const {data} = await axios.get(`http://localhost:5411/api/v1/shipping/${id}`);

    console.log(`Shipping Details : `, data);
    dispatch({type: FETCH_SHIPPING_INFO_SUCCESS, payload: data.shipping});
  } 
  
  catch(error) {

     if(error) {
      dispatch({type: FETCH_SHIPPING_INFO_FAIL, payload: error.response.data.message})
    }

  }

}