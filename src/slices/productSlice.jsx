import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    products: [],
    productQuantity: 0,
    products_in_basket: [],
    total_price: 0,
    target_prod_quantity: 0
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
            const productIndex = state.products.findIndex(el => el.id === action.payload[0]);
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
                state.productQuantity += 1;

                const basketIndex = state.products_in_basket.findIndex(
                    item => item.id === action.payload[0]
                );

                if (basketIndex === -1) {
                    state.products_in_basket = [...state.products_in_basket, updatedProduct];
                } else {
                    state.products_in_basket = state.products_in_basket.map(item =>
                        item.id === action.payload[0] ? { ...item, quantity: item.quantity + 1 } : item // [{id:3, quantity: 1}, ]
                    );
                }

            }
        },
        increaseQuantityProd: (state, action) => {
            state.products.forEach(prod => {
                if (prod.id == action.payload && prod.quantity <= 10) {
                    prod.quantity += 1;
                }
            })

        },
        creaseQuantityProd: (state, action) => {
            state.products.forEach(prod => {
                if (prod.id == action.payload && prod.quantity > 0) {
                    prod.quantity -= 1;
                }
            })
        }
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

export const { addToProductBasket, increaseQuantityProd, creaseQuantityProd } = appSlice.actions
export default appSlice.reducer