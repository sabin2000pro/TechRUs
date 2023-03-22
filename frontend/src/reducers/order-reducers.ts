import { UPDATE_ORDER_STATUS_REQUEST } from './../constants/orders-constants';
import { FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL, FETCH_ORDERS_REQUEST, FETCH_SINGLE_ORDER_REQUEST, FETCH_SINGLE_ORDER_SUCCESS, FETCH_SINGLE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS } from "../constants/orders-constants";

const initialOrdersState = {
    orders: []
}

const singleOrderState = {
    order: {}
}

interface ISingleOrder {
    loading?: boolean;
    error?: string;
    order: {}
}

export const orderReducer = (state = initialOrdersState as any, action: any) => {

    switch(action.type) {

         case FETCH_ORDERS_REQUEST:
            return {loading: true, error: undefined, orders: [] }

        case FETCH_ORDERS_SUCCESS: // In the event that we have retrieved all the orders from the orders database
            return {...state, loading: false, orders: action.payload}

        case FETCH_ORDERS_FAIL:
            return {loading: false, error: action.payload}

        case CREATE_ORDER_REQUEST:
            return {loading: true}

        case CREATE_ORDER_SUCCESS:
            return {...state, loading: false, orderCreated: true, order: action.payload}

        case UPDATE_ORDER_STATUS_REQUEST:
            return {loading: true, error: undefined, order: action.payload}

        default:
            return state
    }
}

export const singleOrderReducer = (state = singleOrderState as ISingleOrder, action: any): ISingleOrder => {
    switch(action.type) {

        case FETCH_SINGLE_ORDER_REQUEST:
            return {loading: true, error: undefined, order: {}}

        case FETCH_SINGLE_ORDER_SUCCESS:
            return {...state, loading: false, error: undefined, order: action.payload}

        case FETCH_SINGLE_ORDER_FAIL:
            return {...state, loading: false, error: action.payload, order: {}}
        
        default:
            return state
    }
}