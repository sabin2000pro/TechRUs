import { FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, FETCH_SINGLE_PRODUCT_REQUEST, FETCH_SINGLE_PRODUCT_SUCCESS, FETCH_SINGLE_PRODUCT_FAIL, FETCH_ALL_PRODUCTS_FAIL, CLEAR_ERRORS, FETCH_NEW_PRODUCTS_REQUEST} from "../constants/products-constants";

interface IProductState {
    products: [],
    loading?: boolean,
    error?: string,
    message?: string;
}

const productsInitialState = {
    products: []
}

const singleProductInitialState = {
    product: {}
}

export const productsReducer = (state = productsInitialState as IProductState, action: any): IProductState => {

    switch(action.type) {
        
        case FETCH_ALL_PRODUCTS_REQUEST:
            return {loading: true, products: [], error: undefined, message: undefined}
        
        case FETCH_ALL_PRODUCTS_SUCCESS: // 2. When we have received all the products
            return {...state, loading: false, products: action.payload}

        case FETCH_ALL_PRODUCTS_FAIL:
            return {loading: false, error: action.payload, products: [], message: undefined}

        default:
            return state
    }
}

// Reducer that is responsible for fetching the product details for one single product
export const singleProductReducer = (state = singleProductInitialState as any, action: any) => {

    switch(action.type) {

        case FETCH_SINGLE_PRODUCT_REQUEST:
            return {loading: true}

        case FETCH_SINGLE_PRODUCT_SUCCESS:
            return {...state, loading: false, product: action.payload}

        case FETCH_SINGLE_PRODUCT_FAIL:
            return {loading: false, error: action.payload}

        case CREATE_PRODUCT_REQUEST:
            return {loading: true, error: undefined, products: []}
    
        case CREATE_PRODUCT_SUCCESS:
            return {...state, loading: false, product: action.payload}
    
        case CREATE_PRODUCT_FAIL:
            return {loading: false, error: action.payload}
        
        case CLEAR_ERRORS:
            return {error: null}

        default:
            return state
    }

}