import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLEAR_BASKET_ITEMS } from "../constants/basket-constants";

export interface IBasket {
    product: string;
    quantity: number;
}

const initialBasketItems = localStorage.getItem("basketItems") ? JSON.parse(localStorage.getItem("basketItems") as any) : {basketItems: []}

export const basketReducer = (state = initialBasketItems, action: any) => {
    switch(action.type) {

        case ADD_ITEM_TO_BASKET:
            const currItem = action.payload
            const currCartItemExists = state.basketItems.find((cartItem: any) => cartItem.product === currItem.product)

            if(currCartItemExists) {
                return {...state, basketItems: state.basketItems.map((item: any) => item.product === currCartItemExists.product ? currItem : item)}
            }

            else { // Otherwise, return all the cart items and the current item to add if the current cart item does not exist
                return {...state, basketItems: [...state.basketItems, currItem]}
            }

        case REMOVE_ITEM_FROM_BASKET:
            return {...state, basketItems: state.basketItems.filter((currentItemToRemove: any) => currentItemToRemove.product !== action.payload)}

        case CLEAR_BASKET_ITEMS: // Reset the cart items, set the array to empty
            return {...state, basketItems: []}

        default:
            return state
    }
}