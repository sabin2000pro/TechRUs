import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, FETCH_ORDERS_REQUEST, FETCH_ORDERS_FAIL, FETCH_ORDERS_SUCCESS } from "../constants/orders-constants";
import axios from 'axios';
import { Dispatch } from "redux";

export const fetchAllOrders = (keyword = '', page = 1) => async (dispatch: Dispatch): Promise<void> => {
    try {
        dispatch({type: FETCH_ORDERS_REQUEST});

        const {data} = await axios.get(`http://localhost:5403/api/v1/orders?keyword=${keyword}`);
        console.log(`Orders Data : `, data);

        dispatch({type: FETCH_ORDERS_SUCCESS, payload: data.orders});
    }
    
    catch(error) {

    }
}

export const createNewOrder = (user: string, orderItems: any) => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }


}

export const editOrderStatus = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}

export const deleteOrders = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }

}

export const deleteOrderByID = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}