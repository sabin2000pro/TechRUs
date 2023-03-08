import axios from 'axios';
import { FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, FETCH_ALL_PRODUCTS_FAIL } from '../constants/products-constants';

export const fetchProducts = () => async (dispatch: any) => {

    try {
      dispatch({type: FETCH_ALL_PRODUCTS_REQUEST});

      const {data} = await axios.get(`http://localhost:5404/api/v1/products`)
    } 
    
    catch(error) {

    }


}

export const fetchNewProducts = () => async (dispatch: any) => {
    try {

    } 
    
    catch(error) {

    }


}

export const fetchSingleProduct = (productId) => async (dispatch: any) => {
    try {

    } 
    
    catch(error) {

    }

}

export const createNewProduct = () => async (dispatch: any) => {
    try {

    } 
    
    catch(error) {

    }
}

export const editProductByID = (productId) => async (dispatch: any) => {
    try {
        
    } 
    
    catch(error) {

    }

}


export const deleteProducts = () => async (dispatch: any) => {

}

export const deleteProductByID = () => async (dispatch: any) => {
    try {

    } 
    
    catch(error) {

    }
}