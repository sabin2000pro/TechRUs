import { UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_FAIL, DELETE_ORDERS_SUCCESS } from './../constants/orders-constants';
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

       if(error) {
         dispatch({type: FETCH_ORDERS_FAIL, payload: error.data.response.message});
       }
    }


}

export const createNewOrder = (user: string, orderItems: any, shippingInformation: any, itemPrice: number, taxPrice: number, shippingPrice: number, totalPrice: number) => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: CREATE_ORDER_REQUEST});

       const {data} = await axios.post(`http://localhost:5403/api/v1/orders`, {user, orderItems, shippingInformation, itemPrice, taxPrice, shippingPrice, totalPrice});
       console.log(`Order Data : `, data);

       dispatch({type: CREATE_ORDER_SUCCESS, payload: data.order});

       localStorage.setItem("order", JSON.stringify(data.order));
    } 
    
    catch(error) {

        if(error) {
            console.log(`Create Order Error : `, error);
            dispatch({type: CREATE_ORDER_FAIL, payload: error.data.response.message});

        }
    }


}

export const editOrderStatus = (newOrderStatus: string) => async (dispatch: Dispatch): Promise<void> => {

    try {
       dispatch({type: UPDATE_ORDER_STATUS_REQUEST});

       const {data} = await axios.put(`http://localhost:5403/api/v1/orders`, {newOrderStatus});
       console.log(`Updated order status data : `, data);

       dispatch({type: UPDATE_ORDER_STATUS_SUCCESS, payload: data.message});
    } 
    
    catch(error) {

       if(error) {
        dispatch({type: UPDATE_ORDER_STATUS_FAIL, payload: error.data.response.message});

       }

       
    }
}

export const deleteOrders = () => async (dispatch: Dispatch): Promise<void> => {


    try {
       dispatch({type: DELETE_ORDERS_REQUEST});

       const {data} = await axios.delete(`http://localhost:5403/api/v1/orders`);

       dispatch({type: DELETE_ORDERS_SUCCESS, payload: data.message})
    } 
    
    catch(error) {
        if(error) {
            dispatch({type: DELETE_ORDERS_FAIL, payload: error.data.response.message});
    
           }
    
    }

}

export const deleteOrderByID = () => async (dispatch: Dispatch): Promise<void> => {
    try {

    } 
    
    catch(error) {

    }
}