import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/AuthSlice'
import userReducer from "../features/user/userSlice";
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        product:productReducer,
        cart:cartReducer
    }
})