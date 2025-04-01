import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

const initialState = {
    loading: false,
    products: [],
    totalProductQuantity: 0,
}

const BASE_URL = "https://fakestoreapi.com"

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json()
    return data
});

const totalQuantity = useSelector(store => store.appSlice.totalQuantity)

export const appSlice = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
        addToProductBasket: (state, action) => {
            state.services.forEach(el => {
                if (el.id == action.payload) {
                    el.quantity += 1;
                    state.totalProductQuantity += 1;
                    totalQuantity += 1
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
    }
})

export const { addToProductBasket } = appSlice.actions

export default appSlice.reducer