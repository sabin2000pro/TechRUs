import { SAVE_SHIPPING_INFO_REQUEST, SAVE_SHIPPING_INFO_FAIL, SAVE_SHIPPING_INFO_SUCCESS } from "../constants/shipping-constants";

const shippingInfoState = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo") as any) : {};

export const shippingReducer = (state = shippingInfoState, action: any) => {
    
    switch(action.type) {

        case SAVE_SHIPPING_INFO_REQUEST:
            return {loading: true}

        case SAVE_SHIPPING_INFO_SUCCESS:
            return {...state, loading: false, shipping: action.payload}

        case SAVE_SHIPPING_INFO_FAIL:
            return {loading: false, error: action.payload}

        

        default:
            return state;
    }
}