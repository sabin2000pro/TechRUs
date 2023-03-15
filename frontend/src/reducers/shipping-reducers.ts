import { SAVE_SHIPPING_INFO_REQUEST,  SAVE_SHIPPING_INFO_SUCCESS, SAVE_SHIPPING_INFO_FAIL} from "../constants/shipping-constants";

const shippingInfoState = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo") as any) : {};

export const shippingReducer = (state = shippingInfoState, action: any) => {
    switch(action.type) {


        default:
            return state;
    }
}