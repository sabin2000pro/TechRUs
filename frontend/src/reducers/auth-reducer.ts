import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, VERIFY_LOGIN_MFA_REQUEST, VERIFY_LOGIN_MFA_SUCCESS, VERIFY_LOGIN_MFA_FAIL, VERIFY_USER_EMAIL_REQUEST, VERIFY_USER_EMAIL_SUCCESS, VERIFY_USER_EMAIL_FAIL, UPDATE_PROFILE_REQUEST } from './../constants/auth-constants';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOAD_USER_SUCCESS, LOAD_USER_FAIL, REGISTER_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOAD_USER_REQUEST, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, CLEAR_AUTH_ERRORS } from "../constants/auth-constants";

const initialAuthState = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") as any) : {}

export const authReducer = (state = {initialAuthState} as any, action: any): any => {

    switch(action.type) {

        case REGISTER_USER_REQUEST: // When we request registration
            return {loading: true}

        case REGISTER_USER_SUCCESS:
            return {...state, loading: false, user: action.payload}

        case REGISTER_USER_FAIL:
            return {loading: false, isAuthenticated: false, error: action.payload}

        case LOGIN_USER_REQUEST: // The event when the user requests to login
            return {loading: true, error: undefined, user: {} }

        case LOGIN_USER_SUCCESS:
            return {...state, loading: false, isAuthenticated: true, user: action.payload, message: action.payload.message}
        
        case LOGIN_USER_FAIL:
            return {loading: false, isAuthenticated: false, error: action.payload}

        case LOGOUT_USER_REQUEST:
            return {loading: true}

        case LOGOUT_USER_SUCCESS:
            return {...state, loading: false, isAuthenticated: false, user: null}

        case LOGOUT_USER_FAIL:
            return {loading: false, error: action.payload}

        case LOAD_USER_REQUEST:
            return {loading: true}

        case LOAD_USER_SUCCESS:
            return {...state, loading: false, isAuthenticated: true, user: action.payload}

        case LOAD_USER_FAIL:
            return {loading: false, error: action.payload}

        case FORGOT_PASSWORD_REQUEST:
            return {loading: true}

        case FORGOT_PASSWORD_SUCCESS:
            return {...state, loading: false, message: action.payload}

        case VERIFY_USER_EMAIL_REQUEST:
            return {loading: true, isAuthenticated: false, error: undefined, message: undefined}

        case VERIFY_USER_EMAIL_SUCCESS:
            return {...state, loading: false, isAuthenticated: false, error: undefined, message: action.payload}

        case VERIFY_USER_EMAIL_FAIL:
            return {loading: false, error: action.payload, isAuthenticated: false, message: undefined}

        case VERIFY_LOGIN_MFA_REQUEST:
            return {loading: true, isAuthenticated: false, error: undefined, message: undefined}

        case VERIFY_LOGIN_MFA_SUCCESS:
            return {...state, loading: false, error: undefined, message: action.payload}

        case VERIFY_LOGIN_MFA_FAIL:
            return {loading: false, error: action.payload, message: undefined}

        case UPDATE_PASSWORD_REQUEST:
            return {loading: true}

        case UPDATE_PASSWORD_SUCCESS:
            return {...state, loading: false, error: undefined, message: action.payload}

        case UPDATE_PASSWORD_FAIL:
            return {loading: false, error: action.payload}

        case UPDATE_PROFILE_REQUEST:
            return {loading: true, error: undefined}

        case CLEAR_AUTH_ERRORS:
            return {loading: false, error: null}

        default:
            return state
    }
}