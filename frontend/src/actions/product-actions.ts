import { FETCH_NEW_PRODUCTS_FAIL } from './../constants/products-constants';
import axios from 'axios';
import { FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, FETCH_ALL_PRODUCTS_FAIL, FETCH_NEW_PRODUCTS_REQUEST } from '../constants/products-constants';

let PRODUCTS_ENDPOINT = `http://localhost:5404/api/v1/products`;


//@ description: Redux action which fetches all of the products from the backend in JSON format
export const fetchProducts = () => async (dispatch: any) => {

    try {

      dispatch({type: FETCH_ALL_PRODUCTS_REQUEST});

      const {data} = await axios.get(PRODUCTS_ENDPOINT);
      console.log(`Fetched products : `, data);

      dispatch({type: FETCH_ALL_PRODUCTS_SUCCESS, payload: data.products});
    } 
    
    catch(error) {

      if(error) {
        console.log(`Fetch products error: `, error);
        dispatch({type: FETCH_ALL_PRODUCTS_FAIL, payload: error.data.response.message});
      }


    }


}

export const fetchNewProducts = () => async (dispatch: any) => {

    try {

        dispatch({type: FETCH_NEW_PRODUCTS_REQUEST}); // When the fgunction is being invoked, we are loading the new products
        const {data} = await axios.get(``)
    } 
    
    catch(error) {
        console.log(`Fetch new products error: `, error);
        dispatch({type: FETCH_NEW_PRODUCTS_FAIL, payload: error.data.response.message});
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