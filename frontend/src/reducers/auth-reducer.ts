import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOAD_USER_SUCCESS, LOAD_USER_FAIL, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOAD_USER_REQUEST } from "../constants/auth-constants";

const initialAuthState = {
   user: {}
}

export interface IAuthState {
    loading?: boolean
    state: any
    user: any
    payload: any
}

export const authReducer = (state = initialAuthState as any, action: any) => {

    switch(action.type) {

        case REGISTER_USER_REQUEST: // When we request registration
            return {loading: true}

        case REGISTER_USER_SUCCESS:
            return {...state, loading: false, user: action.payload}

        case REGISTER_USER_FAIL:
            return {loading: false, isAuthenticated: false, error: action.payload}

        case LOGIN_USER_REQUEST:
            return {loading: true, isAuthenticated: false}

        case LOGIN_USER_SUCCESS:
            return {...state, loading: false, isAuthenticated: true, customer: action.payload}
        
        case LOGIN_USER_FAIL:
            return {loading: false, error: action.payload}

        case LOAD_USER_REQUEST:
            return {loading: true}

        case LOAD_USER_SUCCESS:
            return {loading: false, isAuthenticated: true, }

        default:
            return state
    }
}

export const userReducer = (state = initialAuthState as any, action: any) => {
    switch(action.type) {

        default:
            return state
    }
}