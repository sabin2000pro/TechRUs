import { ADD_ITEM_TO_BASKET, REMOVE_ITEM_FROM_BASKET, CLEAR_BASKET_ITEMS } from "../constants/basket-constants";

export interface ICartItems {
    product: string;
    quantity: number;
}

const initialCartItems = { // The cart items state will store the cart items array and the user shipping information in an object
    cartItems: [] as ICartItems[],
    shippingInformation: {}
}

export const basketReducer = (state = initialCartItems, action: any) => {
    switch(action.type) {

        case ADD_ITEM_TO_BASKET:
            const currItem = action.payload
            const currCartItemExists = state.cartItems.find((cartItem: any) => cartItem.product === currItem.product)

            if(currCartItemExists) {
                return {...state, cartItems: state.cartItems.map((item: any) => item.product === currCartItemExists.product ? currItem : item)}
            }

            else {
                return {...state, cartItems: [state.cartItems, currItem]}
            }

        case REMOVE_ITEM_FROM_BASKET:
            const currentItemToRemove = action.payload
            return {...state, cartItems: state.cartItems.filter((currentItemToRemove: any) => currentItemToRemove.product !== currentItemToRemove)}

        case CLEAR_BASKET_ITEMS: // Reset the cart items, set the array to empty
            return {...state, cartItems: []}

        default:
            return state
    }
}