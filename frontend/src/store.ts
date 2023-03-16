import { shippingReducer } from './reducers/shipping-reducers';
import { productsReducer, singleProductReducer } from './reducers/products-reducers';
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./reducers/auth-reducer"
import { basketReducer } from './reducers/basket-reducer';
import { usersReducer, singleUserReducer } from './reducers/user-reducers';

export const store = configureStore({
    
    reducer: {
        auth: authReducer,
        users: usersReducer,
        products: productsReducer,
        singleProduct: singleProductReducer,
        singleUser: singleUserReducer,
        basket: basketReducer,
        shipping: shippingReducer
    }

})