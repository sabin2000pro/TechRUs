import { SAVE_SHIPPING_INFO_REQUEST, SAVE_SHIPPING_INFO_FAIL, SAVE_SHIPPING_INFO_SUCCESS, EDIT_SHIPPING_INFO_REQUEST, EDIT_SHIPPING_INFO_SUCCESS, EDIT_SHIPPING_STATUS_FAIL, EDIT_SHIPPING_INFO_FAIL } from "../constants/shipping-constants";

const shippingInfoState = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo") as any) : {};

interface IShippingState { // Default shipping state
    loading: boolean;
    error?: string;
    message?: string;

    shipping: {
      address: string;
      city: string;
      postalCode: string;
      phoneNo: string;
    }[]

}

export const shippingReducer = (state: IShippingState = shippingInfoState, action: any): IShippingState => {
    
    switch(action.type) {

        case SAVE_SHIPPING_INFO_REQUEST:
            return {loading: true, error: undefined, shipping: []}

        case SAVE_SHIPPING_INFO_SUCCESS:
            return {...state, loading: false, shipping: action.payload}

        case SAVE_SHIPPING_INFO_FAIL:
            return {loading: false, error: action.payload, shipping: []}

        case EDIT_SHIPPING_INFO_REQUEST:
            return {...state, loading: false, error: undefined}

        case EDIT_SHIPPING_INFO_SUCCESS:
            return {...state, loading: false, error: undefined, message: action.payload}

        case EDIT_SHIPPING_INFO_FAIL:
            return {...state, loading: false, error: action.payload, message: undefined}

        default:
            return state;
    }
}