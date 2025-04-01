import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '../slices/basketSlice'
import appReducer from '../slices/appSlice'

export const store = configureStore({
    reducer: {
        basketSlicer: basketReducer,
        appSlicer: appReducer
    },
})