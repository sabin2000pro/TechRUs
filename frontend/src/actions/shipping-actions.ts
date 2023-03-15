import { SAVE_SHIPPING_INFO_REQUEST, SAVE_SHIPPING_INFO_SUCCESS, SAVE_SHIPPING_INFO_FAIL } from "../constants/shipping-constants";
import axios from 'axios';

export const createNewShipping = () => async (dispatch) => {
    try {
        dispatch({type: SAVE_SHIPPING_INFO_REQUEST});
    } 
    
    catch(error) {
      if(error) {
        dispatch({type: SAVE_SHIPPING_INFO_FAIL, payload: error.response.data.message})
      }
    }


}

export const editShippingDetails = () => async (dispatch) => {

    try {

    } 
    
    catch(error) {

    }
}