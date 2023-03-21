import { reviewsReducer, singleReviewReducer } from './reducers/review-reducers';
import { orderReducer, singleOrderReducer } from './reducers/order-reducers';
import { couponReducer } from './reducers/coupon-reducers';
import { shippingReducer } from './reducers/shipping-reducers';
import { productsReducer, singleProductReducer } from './reducers/products-reducers';
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./reducers/auth-reducer"
import { basketReducer } from './reducers/basket-reducer';
import { usersReducer, singleUserReducer } from './reducers/user-reducers';

export const store = configureStore({ // Create the global store
    
    reducer: {
        auth: authReducer,
        users: usersReducer,
        products: productsReducer,
        coupon: couponReducer,
        singleProduct: singleProductReducer,
        singleUser: singleUserReducer,
        review: reviewsReducer,
        singleReview: singleReviewReducer,
        basket: basketReducer,
        shipping: shippingReducer,
        orders: orderReducer,
        singleOrder: singleOrderReducer
    }

})