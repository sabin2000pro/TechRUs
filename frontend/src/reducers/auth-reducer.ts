import { REGISTER_CUSTOMER_REQUEST, REGISTER_CUSTOMER_SUCCESS, REGISTER_CUSTOMER_FAIL, LOGIN_CUSTOMER_REQUEST, LOGIN_CUSTOMER_FAIL } from "../constants/auth-constants";

const initialAuthState = {
   customer: {}
}

export const authReducer = (state = initialAuthState, action: any) => {
    switch(action.type) {

        case REGISTER_CUSTOMER_REQUEST:
            return {loading: false}

        case REGISTER_CUSTOMER_SUCCESS:
            return {...state, loading: false, user: action.payload}

        case REGISTER_CUSTOMER_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}

export const customerReducer = (state = initialAuthState, action: any) => {
    switch(action.type) {

        default:
            return state
    }
}