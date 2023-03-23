import { FETCH_ALL_COUPONS_FAIL, FETCH_ALL_COUPONS_SUCCESS, FETCH_ALL_COUPONS_REQUEST, FETCH_SINGLE_COUPON_REQUEST} from "../constants/coupon-constants"

const defaultCouponsState = {
    coupons: []
}

const defaultSingleCouponState = {
    coupon: {}
}

export const couponReducer = (state = defaultCouponsState as any, action: any) => {

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