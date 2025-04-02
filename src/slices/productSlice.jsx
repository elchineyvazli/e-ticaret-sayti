import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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


export const appSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        addToProductBasket: (state, action) => {
            const product = state.products.find(el => el.id === action.payload);
            if (product) {
                product.quantity += 1;
                state.totalProductQuantity += 1;
            }
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