import { Dispatch } from 'redux';
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_SUCCESS, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_SINGLE_PRODUCT_REQUEST, DELETE_SINGLE_PRODUCT_FAIL, DELETE_SINGLE_PRODUCT_SUCCESS, DELETE_PRODUCTS_FAIL } from './../constants/products-constants';
import { FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, FETCH_ALL_PRODUCTS_FAIL, FETCH_NEW_PRODUCTS_REQUEST, FETCH_SINGLE_PRODUCT_FAIL, FETCH_SINGLE_PRODUCT_REQUEST, FETCH_SINGLE_PRODUCT_SUCCESS } from '../constants/products-constants';
import axios from 'axios';
import { PRODUCTS_URI_FETCH_PRODUCTS } from './uri-helper';

//@ description: Redux action which fetches all of the products from the backend in JSON format
export const fetchProducts = (keyword = '', page = 1, productsPerPage = 3) => async (dispatch: any): Promise<void> => {

    try {

      dispatch({type: FETCH_ALL_PRODUCTS_REQUEST});
      const {data} = await axios.get(`${PRODUCTS_URI_FETCH_PRODUCTS}?keyword=${keyword}&page=${page}&productsPerPage=${productsPerPage}`);    
      dispatch({type: FETCH_ALL_PRODUCTS_SUCCESS, payload: data.products});

    } 
    
    catch(error) {

      if(error) {
        dispatch({type: FETCH_ALL_PRODUCTS_FAIL, payload: error.data.response.message});
      }


    }
}

export const fetchSingleProduct = (id: string) => async (dispatch: Dispatch): Promise<void> => {

    try {

       dispatch({type: FETCH_SINGLE_PRODUCT_REQUEST});

       const {data} = await axios.get(`${PRODUCTS_URI_FETCH_PRODUCTS}/${id}`);
       dispatch({type: FETCH_SINGLE_PRODUCT_SUCCESS, payload: data.product});

    } 
    
    catch(error) {
      if(error) {

        dispatch({type: FETCH_SINGLE_PRODUCT_FAIL, payload: error.data.response.message});
      }
    }

}

// @description: Action which creates a new product. it accepts the product details as parameters
export const createNewProduct = (name: string, description: string, warranty: string, price: number, stockCount: number, lowStockAlert: number) => async (dispatch: Dispatch): Promise<void> => {
    try {

       dispatch({type: CREATE_PRODUCT_REQUEST});
       const {data} = await axios.post(PRODUCTS_URI_FETCH_PRODUCTS, {name, description, warranty, price, stockCount, lowStockAlert});
       dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data.product});
    } 
    
    catch(error) {

      if(error) {
        dispatch({type: CREATE_PRODUCT_FAIL, payload: error.data.response.message});
      }

    }

}

export const editProductByID = (id: number, updatedData: any) => async (dispatch: Dispatch): Promise<void> => {

    try {

        dispatch({type: EDIT_PRODUCT_REQUEST});

        const {data} = await axios.put(`${PRODUCTS_URI_FETCH_PRODUCTS}/${id}`, updatedData);
        console.log(`Updated Product Data : `, data);

        dispatch({type: EDIT_PRODUCT_SUCCESS, payload: data})
    } 
    
    catch(error) {

      if(error) {
         dispatch({type: EDIT_PRODUCT_FAIL, payload: error.data.response.message})
      }

    }

}


// @description: 
export const deleteProducts = () => async (dispatch: Dispatch): Promise<void> => {

  try {
    
     dispatch({type: DELETE_PRODUCTS_REQUEST});
     const {data} = await axios.delete(`${PRODUCTS_URI_FETCH_PRODUCTS}`);

     dispatch({type: DELETE_PRODUCTS_SUCCESS, payload: data.message});
  } 
  
  catch(error) {

     if(error) {
        dispatch({type: DELETE_PRODUCTS_FAIL, payload: error.data.response.message});
     }
     
  }

}

export const deleteProductByID = (id: string) => async (dispatch: any): Promise<void> => {

    try {

       dispatch({type: DELETE_SINGLE_PRODUCT_REQUEST});
       const {data} = await axios.delete(`${PRODUCTS_URI_FETCH_PRODUCTS}/${id}`);

       console.log(`Delete Product data : `, data);

       dispatch({type: DELETE_SINGLE_PRODUCT_SUCCESS, payload: data.message})
    } 
    
    catch(error) {

      if(error) {
        dispatch({type: DELETE_SINGLE_PRODUCT_FAIL, payload: error.data.response.message})
      }

    }


}