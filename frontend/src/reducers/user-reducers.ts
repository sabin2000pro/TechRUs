import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL, FETCH_SINGLE_USER_REQUEST, FETCH_SINGLE_USER_SUCCESS, FETCH_SINGLE_USER_FAIL, EDIT_USER_DETAILS_REQUEST, EDIT_USER_DETAILS_SUCCESS, EDIT_USER_SHIFTS_REQUEST, EDIT_USER_SHIFTS_SUCCESS, EDIT_USER_SHIFTS_FAIL } from './../constants/user-constants';

const initialUserState = { // initial users state is an array
    users: []
}

const singleUserState = {
    user: {}
}

export const usersReducer = (state = initialUserState as any, action: any) => {

    switch(action.type) {
        
        case FETCH_USERS_REQUEST: // When requesting all the users, we set the loading flag to true
            return {loading: true}

        case FETCH_USERS_SUCCESS: // When the users have been fetched we set the users to its payload
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
            const shiftsToUpdate = {startShiftDate: action.payload.startShiftDate, endShiftDate: action.payload.endShiftDate};
            return {...state, loading: false, user: shiftsToUpdate}

        case EDIT_USER_SHIFTS_FAIL:
            return {...state, loading: false, error: action.payload}

        default:
            return state
    }

}