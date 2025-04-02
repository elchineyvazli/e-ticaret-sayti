import { configureStore } from '@reduxjs/toolkit'
import serviceReducer from '../slices/serviceSlice'
import productReducer from '../slices/productSlice'
import appReducer from '../slices/appSlice'

export const store = configureStore({
    reducer: {
        serviceSlice: serviceReducer,
        productSlice: productReducer,
        appSlice: appReducer
    },
})