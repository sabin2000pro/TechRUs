import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL, FETCH_SINGLE_USER_REQUEST } from './../constants/user-constants';

const initialUserState = {
    users: []
}

const singleUserState = {
    user: {}
}

export const userReducer = (state = initialUserState, action: any) => {

    switch(action.type) {
        
        case FETCH_USERS_REQUEST:
            return {loading: true}

        case FETCH_USERS_SUCCESS:
            return {...state, loading: false, users: action.payload}

        case FETCH_USERS_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }
}

export const singleReducer = (state = singleUserState, action: any) => {
    switch(action.type) {
    
        case FETCH_SINGLE_USER_REQUEST:
            return {loading: true}

        default:
            return state
    }

}