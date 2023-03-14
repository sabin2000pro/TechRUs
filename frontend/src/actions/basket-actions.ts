import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLEAR_BASKET_ITEMS} from "../constants/basket-constants";
import axios from 'axios';

export const addProductToBasket = (id: string, quantity: number) => async (dispatch: any, getState: any) => {
    try {
        const {data} = await axios.get(`http://localhost:5404/api/v1/products/${id}`);
        console.log(`Product Data To Add To Cart : `, data);
        dispatch({type: ADD_ITEM_TO_BASKET, payload: {product: id, quantity}})

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } 
    
    catch(error) {
       if(error) {
         return console.error(error)
       }

    }
}

export const removeProductFromBasket = (productId: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: REMOVE_ITEM_FROM_BASKET, payload: productId});
    } 
    
    catch(error) {

    }
}