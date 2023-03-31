import { FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, FETCH_SINGLE_PRODUCT_REQUEST, FETCH_SINGLE_PRODUCT_SUCCESS, FETCH_SINGLE_PRODUCT_FAIL, FETCH_ALL_PRODUCTS_FAIL} from "../constants/products-constants";

interface IProductsState {
    products: [],
    loading?: boolean,
    error?: string,
    message?: string;
    numberOfProducts?: number;
}

interface SingleProductState {
    loading?: boolean,
    error?: string,
    product: Object,
    message?: string
}

const productsInitialState = {
    products: []
}

const singleProductInitialState = {
    product: {}
}

export const productsReducer = (state = productsInitialState as IProductsState, action: any): IProductsState => {

    switch(action.type) {
        
        case FETCH_ALL_PRODUCTS_REQUEST:
            return {loading: true, products: [], error: undefined, message: undefined}
        
        case FETCH_ALL_PRODUCTS_SUCCESS: // 2. When we have received all the products
            return {...state, loading: false, products: action.payload, numberOfProducts: action.payload.numberOfProducts}

        case FETCH_ALL_PRODUCTS_FAIL:
            return {loading: false, error: action.payload, products: [], message: undefined}

        default:
            return state
    }
}

// Reducer that is responsible for fetching the product details for one single product
export const singleProductReducer = (state = singleProductInitialState as SingleProductState, action: any): SingleProductState => {

    switch(action.type) {

        case FETCH_SINGLE_PRODUCT_REQUEST:
            return {loading: true, error: undefined, product: {}}

        case FETCH_SINGLE_PRODUCT_SUCCESS:
            return {...state, loading: false, product: action.payload}

        case FETCH_SINGLE_PRODUCT_FAIL:
            return {loading: false, error: action.payload, product: {}}

        case CREATE_PRODUCT_REQUEST:
            return {loading: true, error: undefined, product: {}}
    
        case CREATE_PRODUCT_SUCCESS:
            return {...state, loading: false, product: action.payload, message: action.payload.message, error: undefined}
    
        case CREATE_PRODUCT_FAIL:
            return {loading: false, error: action.payload, product: {}}

        default:
            return state
    }

}