import { FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, FETCH_ALL_PRODUCTS_FAIL} from "../constants/products-constants";

const productsInitialState = {
    products: []
}

const singleProductInitialState = {
    product: {}
}

export const productsReducer = (state = productsInitialState as any, action: any) => {

    switch(action.type) {
        
        case FETCH_ALL_PRODUCTS_REQUEST:
            return {loading: true}
        
        case FETCH_ALL_PRODUCTS_SUCCESS: // 2. When we have received all the products
            return {...state, loading: false, products: action.payload}


        default:
            return state
    }
}

export const singleProductReducer = (state = singleProductInitialState as any, action) => {
    switch(action.type) {

    }

}