import { FETCH_ALL_COUPONS_FAIL, FETCH_ALL_COUPONS_SUCCESS, FETCH_ALL_COUPONS_REQUEST, FETCH_SINGLE} from "../constants/coupon-constants"

const defaultCouponsState = {
    coupons: []
}

const defaultSingleCouponState = {
    coupon: {}
}

export const couponReducer = (state = defaultCouponsState, action: any) => {

    switch(action.type) {

        case FETCH_ALL_COUPONS_REQUEST:
            return {loading: true}

        default:
            return state
    }


}

export const singleCouponReducer = (state = defaultSingleCouponState, action: any) => {
    switch(action.type) {
        
        default:
            return state
    }


}