import { EDIT_SHIPPING_INFO_REQUEST } from './../constants/shipping-constants';
import { SAVE_SHIPPING_INFO_REQUEST, SAVE_SHIPPING_INFO_SUCCESS, SAVE_SHIPPING_INFO_FAIL } from "../constants/shipping-constants";
import axios from 'axios';

export const createNewShipping = (address: string, city: string, country: string, postalCode: string) => async (dispatch) => {
    try {

        dispatch({type: SAVE_SHIPPING_INFO_REQUEST});

        const {data} = await axios.post(`http://localhost:5411/api/v1/shipping`, {address, city, country, postalCode})

        console.log(`Shipping Data : `, data);
        localStorage.setItem("shippingInfo", JSON.stringify(data.shipping));

        dispatch({type: SAVE_SHIPPING_INFO_SUCCESS, payload: data.shipping});
    } 
    
    catch(error) {

      if(error) {
        dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
      }

    }


}

export const editShippingDetails = (id: string, address: string, city: string, country: string, postalCode: string, phoneNo: string) => async (dispatch) => {

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

export const editShippingStatus = (id: string, currentStatus: string, newStatus: string) => async (dispatch) => {
  try {
  
  } 
  
  catch(error) {

  }


}

export const fetchAllShippingDetails = (id: string, currentStatus: string, newStatus: string) => async (dispatch) => {
  try {

  } 
  
  catch(error) {

  }


}

export const fetchShippingDetailsByID = (id: string, currentStatus: string, newStatus: string) => async (dispatch) => {
  try {

  } 
  
  catch(error) {

  }


}