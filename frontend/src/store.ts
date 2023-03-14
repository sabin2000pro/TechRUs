import { productsReducer, singleProductReducer } from './reducers/products-reducers';
import {configureStore} from "@reduxjs/toolkit"
import { authReducer, userReducer } from "./reducers/auth-reducer"
import { basketReducer } from './reducers/basket-reducer';

export const store = configureStore({
    
    reducer: {
        auth: authReducer,
        user: userReducer,
        products: productsReducer,
        singleProduct: singleProductReducer,
        basket: basketReducer
    }

})