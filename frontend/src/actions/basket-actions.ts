import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET} from "../constants/basket-constants";
import axios from 'axios';
import { Dispatch } from "redux";
import { PRODUCTS_URI_FETCH_PRODUCTS } from "./uri-helper";

// @description: Method which adds a product chosen by the user to their basket given the product ID and quantity chosen

export const addProductToBasket = (id: string, quantity: number) => async (dispatch: Dispatch, getState: any): Promise<void> => {

    try {
        const {data} = await axios.get(`${PRODUCTS_URI_FETCH_PRODUCTS}/${id}`);
        dispatch({type: ADD_ITEM_TO_BASKET, payload: {product: data.product._id, price: data.product.price, quantity: Number(quantity), name: data.product.name, description: data.product.description, warranty: data.product.warranty, image: data.product.image}})
        localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems))
    } 
    
    catch(error) {

       if(error) {
         return console.error(error)
       }

    }
}

// Basket Action that removes a product from the basket given the ID of the product
export const removeProductFromBasket = (id: string) => async (dispatch: any, getState: any): Promise<void> => {
    
    try {
        dispatch({type: REMOVE_ITEM_FROM_BASKET, payload: id});
        localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems))
    } 
    
    catch(error) {
      
      if(error) {
        return console.error(error);
      }

    }
}