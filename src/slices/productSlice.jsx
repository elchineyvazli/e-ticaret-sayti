import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    products: [],
    productQuantity: 0,
    products_in_basket: [],
    total_price: 0,
}

const BASE_URL = "http://localhost:8000"

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await fetch(`${BASE_URL}/products`)
    const data = await response.json()
    return data
});

const calculateTotalPrice = (products) =>
    products.reduce((sum, item) => sum + item.price * item.quantity, 0);


export const appSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        addToProductBasket: (state, action) => {
            const productIndex = state.products.findIndex(el => el.id === action.payload[0]);

            if (productIndex !== -1) {
                const updatedProduct = {
                    ...state.products[productIndex],
                    quantity: action.payload[1],
                    total_quantity: (
                        state.products[action.payload[0] - 1].total_quantity == 0 ?
                            (
                                state.products[action.payload[0] - 1].quantity
                            ) :
                            (
                                state.products[action.payload[0] - 1].total_quantity + action.payload[1]
                            )
                    )
                };


                state.products = [
                    ...state.products.slice(0, productIndex),
                    updatedProduct,
                    ...state.products.slice(productIndex + 1)
                ];
                state.productQuantity += action.payload[1];

                const basketIndex = state.products_in_basket.findIndex(item => item.id === action.payload[0]);

                if (basketIndex === -1) {
                    state.products_in_basket = [...state.products_in_basket, updatedProduct];
                } else {
                    state.products_in_basket = state.products_in_basket.map(item => {
                        return item.id === action.payload[0]
                            ? { ...item, quantity: item.quantity + action.payload[1] }
                            : item;
                    });
                }
                state.total_price = calculateTotalPrice(state.products_in_basket);

            }
        },
        increaseQuantityProd: (state, action) => {
            state.products.forEach(prod => {
                if (
                    prod.id == action.payload
                    &&
                    prod.quantity < 10
                ) {
                    prod.quantity += 1;
                }
            })
            state.total_price = calculateTotalPrice(state.products_in_basket);
        },
        creaseQuantityProd: (state, action) => {
            state.products.forEach(prod => {
                if (prod.id == action.payload && prod.quantity > 1) {
                    prod.quantity -= 1;
                }
            })
            state.total_price = calculateTotalPrice(state.products_in_basket);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.map(product => ({
                ...product,
                quantity: 1
            }))
        })
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
    }
})

export const { addToProductBasket, increaseQuantityProd, creaseQuantityProd } = appSlice.actions
export default appSlice.reducer