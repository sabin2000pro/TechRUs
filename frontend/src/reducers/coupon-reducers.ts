import { FETCH_ALL_COUPONS_FAIL, FETCH_ALL_COUPONS_SUCCESS, FETCH_ALL_COUPONS_REQUEST} from "../constants/coupon-constants"

const defaultCouponsState = {
    coupons: []
}

const defaultSingleCouponState = {
    coupon: {}
}

export const couponReducer = (state: any, action: any) => {

    switch(action.type) {

        case FETCH_ALL_COUPONS_REQUEST:
            return {loading: true}

        default:
            return state
    }


}