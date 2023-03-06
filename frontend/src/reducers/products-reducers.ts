import { FETCH_ALL_PRODUCTS_REQUEST } from "../constants/products-constants";

const productsInitialState = {
    products: []
}

const singleProductInitialState = {
    product: {}
}

export const productsReducer = (state = productsInitialState as any, action: any) => {
    
}

export const singleProductReducer = (state = singleProductInitialState as any, action) => {
    switch(action.type) {

    }

}