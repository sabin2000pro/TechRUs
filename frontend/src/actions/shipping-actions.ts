import { Dispatch } from 'redux';
import { EDIT_SHIPPING_INFO_REQUEST, EDTI_SHIPPING_STATUS_REQUEST, EDIT_SHIPPING_INFO_SUCCESS, FETCH_SHIPPING_INFO_REQUEST, FETCH_SHIPPING_INFO_FAIL, FETCH_SHIPPING_INFO_SUCCESS, DELETE_SHIPPING_DETAILS_REQUEST, DELETE_SHIPPING_DETAILS_SUCCESS, DELETE_SHIPPING_DETAILS_FAIL } from './../constants/shipping-constants';
import { SAVE_SHIPPING_INFO_REQUEST, SAVE_SHIPPING_INFO_SUCCESS, SAVE_SHIPPING_INFO_FAIL } from "../constants/shipping-constants";
import axios from 'axios';
import { SHIPPING_URI } from './uri-helper';

export const fetchAllShippingDetails = () => async (dispatch: Dispatch): Promise<void> => {

  try {
     dispatch({type: FETCH_SHIPPING_INFO_REQUEST});

     const {data} = await axios.get(SHIPPING_URI);

     dispatch({type: FETCH_SHIPPING_INFO_SUCCESS, payload: data.shipping})
  } 
  
  catch(error: any) {

    if(error) {
      dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
    }

  }


}


// @description: Redux action which is responsible for sending a POST request to the shipping microservice endpoint to create a resource
// @method: POST
// @parameters: The user's shipping address, city, country, post code and phone number

export const createNewShipping = (user: any, address: string, city: string, country: string, postalCode: string, phoneNo: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

        dispatch({type: SAVE_SHIPPING_INFO_REQUEST});

        const {data} = await axios.post(SHIPPING_URI, {user, address, city, country, postalCode, phoneNo})

        if (!data.shipping) {
          throw new Error('Shipping information is null or undefined');
      }

        dispatch({type: SAVE_SHIPPING_INFO_SUCCESS, payload: data.shipping});
        localStorage.setItem("shippingInformation", JSON.stringify(data.shipping));

    } 
    
    catch(error: any) {

      if(error) {

        dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
      }

    }

}

export const editShippingDetails = (id: string, address: string, city: string, country: string, postalCode: string, phoneNo: string) => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: EDIT_SHIPPING_INFO_REQUEST});

       const {data} = await axios.put(`${SHIPPING_URI}/api/v1/shipping/${id}`, {address, city, country, postalCode, phoneNo})
       dispatch({type: SAVE_SHIPPING_INFO_SUCCESS, payload: data.shipping})
    } 
    
    catch(error: any) {
        
        if(error) {
            dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
        }

    }

}

export const editShippingStatus = (id: string, currentStatus: string, newStatus: string) => async (dispatch: Dispatch): Promise<void> => {
  try {

     dispatch({type: EDTI_SHIPPING_STATUS_REQUEST});
     
     const {data} = await axios.put(`${SHIPPING_URI}/${id}/update-status`, {currentStatus, newStatus})
     dispatch({type: EDIT_SHIPPING_INFO_SUCCESS, payload: data.shipping})
  } 
  
  catch(error: any) {

    if(error) {
      dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
   }

  }

}

export const fetchShippingDetailsByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
  
  try {
    dispatch({type: FETCH_SHIPPING_INFO_REQUEST});

    const {data} = await axios.get(`${SHIPPING_URI}/${id}`);

    dispatch({type: FETCH_SHIPPING_INFO_SUCCESS, payload: data.shipping});
  } 
  
  catch(error: any) {

     if(error) {
      dispatch({type: FETCH_SHIPPING_INFO_FAIL, payload: error.response.data.message})
    }

  }

}

export const deleteShippingDetailsByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {

  try {

     dispatch({type: DELETE_SHIPPING_DETAILS_REQUEST});

     const {data} = await axios.delete(`${SHIPPING_URI}/${id}`);

     console.log(`Deleted Shipping Details data : `, data);

     dispatch({type: DELETE_SHIPPING_DETAILS_SUCCESS, payload: data.message});
  } 
  
  catch(error: any) {

     if(error) {  
      dispatch({type: DELETE_SHIPPING_DETAILS_FAIL, payload: error.response.data.message});
     }

  }

}