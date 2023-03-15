import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL, FETCH_SINGLE_USER_REQUEST, FETCH_SINGLE_USER_SUCCESS, FETCH_SINGLE_USER_FAIL, EDIT_USER_DETAILS_REQUEST, EDIT_USER_DETAILS_SUCCESS, EDIT_USER_SHIFTS_REQUEST, EDIT_USER_SHIFTS_SUCCESS, EDIT_USER_SHIFTS_FAIL } from './../constants/user-constants';

const initialUserState = {
    users: []
}

const singleUserState = {
    user: {}
}

export const userReducer = (state = initialUserState as any, action: any) => {

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

export const singleUserReducer = (state = singleUserState as any, action: any) => {
    switch(action.type) {
    
        case FETCH_SINGLE_USER_REQUEST:
            return {loading: true}

        case FETCH_SINGLE_USER_SUCCESS:
            return {...state, loading: false, user: action.payload}

        case FETCH_SINGLE_USER_FAIL:
            return {...state, loading: false, error: action.payload}

        case EDIT_USER_SHIFTS_REQUEST:
            return {loading: true}

        case EDIT_USER_SHIFTS_SUCCESS:
            const updatedUserShifts = {...state.user, startShiftDate: action.payload.startShiftDate, endShiftDate: action.payload.endShiftDate};
            return {...state, loading: false, user: updatedUserShifts}

        case EDIT_USER_SHIFTS_FAIL:
            return {}

        default:
            return state
    }

}