import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLEAR_BASKET_ITEMS } from "../constants/basket-constants";

export interface IBasket {
    product: string;
    quantity: number;
}

const basketItems = localStorage.getItem("basketItems") ? JSON.parse(localStorage.getItem("basketItems") as any) : []

export const basketReducer = (state = {basketItems}, action: any) => {

    switch(action.type) {

        case ADD_ITEM_TO_BASKET: // Reducer for adding an item to the cart

            const currItem = action.payload // Extract the basket item from the payload
            const currCartItemExists = state.basketItems.find((cartItem: any) => cartItem.product === currItem.product) // If the cart item already exists usin the find() method then we return the item

            if(currCartItemExists) {
                return {...state, basketItems: state.basketItems.map((item: any) => item.product === currCartItemExists.product ? currItem : item)}
            }

            else { // Otherwise, return all the cart items and the current item to add if the current cart item does not exist
                return {...state, basketItems: [...state.basketItems, currItem]}
            }

        case REMOVE_ITEM_FROM_BASKET: // 2. Remove an item from basket action constant
            return {...state, basketItems: state.basketItems.filter((currentItemToRemove: any) => currentItemToRemove.product !== action.payload)}

        case CLEAR_BASKET_ITEMS: // Reset the cart items, set the array to empty
            return {...state, basketItems: []}

        default:
            return state
    }
    
}