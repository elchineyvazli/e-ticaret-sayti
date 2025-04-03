import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    products: [],
    totalProductQuantity: 0,
    products_in_basket: []
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
            const productIndex = state.products.findIndex(el => el.id === action.payload);
            if (productIndex !== -1) {
                const updatedProduct = {
                    ...state.products[productIndex],
                    quantity: (state.products[productIndex].quantity || 0) + 1
                };

                state.products = [
                    ...state.products.slice(0, productIndex),
                    updatedProduct,
                    ...state.products.slice(productIndex + 1)
                ];

                state.totalProductQuantity += 1;

                // state.products_in_basket = [...state.products_in_basket, updatedProduct];
                const basketIndex = state.products_in_basket.findIndex(
                    item => item.id === action.payload
                );

                if (basketIndex === -1) {
                    state.products_in_basket = [...state.products_in_basket, updatedProduct];
                } else {
                    state.products_in_basket = state.products_in_basket.map(item =>
                        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item // [{id:3, quantity: 1}, ]
                    );
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.map(product => ({
                ...product,
                quantity: 0
            }))
        })
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
    }
})

export const { addToProductBasket } = appSlice.actions
export default appSlice.reducer