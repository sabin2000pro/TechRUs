import { productsReducer } from './reducers/products-reducers';
import {configureStore} from "@reduxjs/toolkit"
import { authReducer, userReducer } from "./reducers/auth-reducer"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }

})