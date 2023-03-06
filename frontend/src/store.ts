import {configureStore} from "@reduxjs/toolkit"
import { authReducer, customerReducer } from "./reducers/auth-reducer"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer
    }

})