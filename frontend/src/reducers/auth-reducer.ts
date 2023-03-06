import { REGISTER_CUSTOMER_REQUEST, REGISTER_CUSTOMER_SUCCESS, LOAD_CUSTOMER_SUCCESS, LOAD_CUSTOMER_FAIL, REGISTER_CUSTOMER_FAIL, LOGIN_CUSTOMER_REQUEST, LOGIN_CUSTOMER_FAIL, LOGIN_CUSTOMER_SUCCESS, LOAD_CUSTOMER_REQUEST } from "../constants/auth-constants";

const initialAuthState = {
   customer: {}
}

export interface IAuthState {
    loading?: boolean
    state: any
    customer: any
    payload: any
}

export const authReducer = (state = initialAuthState as any, action: any) => {

    switch(action.type) {

        case REGISTER_CUSTOMER_REQUEST: // When we request registration
            return {loading: true}

        case REGISTER_CUSTOMER_SUCCESS:
            return {...state, loading: false, customer: action.payload}

        case REGISTER_CUSTOMER_FAIL:
            return {loading: false, isAuthenticated: false, error: action.payload}

        case LOGIN_CUSTOMER_REQUEST:
            return {loading: true, isAuthenticated: false}

        case LOGIN_CUSTOMER_SUCCESS:
            return {...state, loading: false, isAuthenticated: true, customer: action.payload}
        
        case LOGIN_CUSTOMER_FAIL:
            return {loading: false, error: action.payload}

        case LOAD_CUSTOMER_REQUEST:
            return {loading: true}

        case LOAD_CUSTOMER_SUCCESS:
            return {loading: false, isAuthenticated: true, }

        default:
            return state
    }
}

export const customerReducer = (state = initialAuthState as any, action: any) => {
    switch(action.type) {

        default:
            return state
    }
}