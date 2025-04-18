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
    const response = await fetch(`${BASE_URL}/api/products/`)
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

                state.products[productIndex] = updatedProduct;

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
            const prodInBasket = state.products_in_basket.find(prod => prod.id === action.payload);
            if (prodInBasket && prodInBasket.quantity < 10) {
                prodInBasket.quantity += 1;
            }

            const prodInProducts = state.products.find(prod => prod.id === action.payload);
            if (prodInProducts && prodInProducts.quantity < 10) {
                prodInProducts.quantity += 1;
            }

            state.total_price = calculateTotalPrice(state.products_in_basket);
        },
        creaseQuantityProd: (state, action) => {
            const prodInBasket = state.products_in_basket.find(prod => prod.id === action.payload);
            if (prodInBasket && prodInBasket.quantity > 1) {
                prodInBasket.quantity -= 1;
            }

            const prodInProducts = state.products.find(prod => prod.id === action.payload);
            if (prodInProducts && prodInProducts.quantity > 1) {
                prodInProducts.quantity -= 1;
            }

            state.total_price = calculateTotalPrice(state.products_in_basket);
        },
        clearBasket: (state) => {
            state.products_in_basket = [];
            state.total_price = 0;
            state.productQuantity = 0;
        },
        removeFromBasket: (state, action) => {
            state.products_in_basket = state.products_in_basket.filter(item => item.id !== action.payload);
            state.total_price = calculateTotalPrice(state.products_in_basket);
            state.productQuantity = state.products_in_basket.reduce((acc, item) => acc + item.quantity, 0);
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

export const {
    addToProductBasket,
    increaseQuantityProd,
    creaseQuantityProd,
    clearBasket,
    removeFromBasket
} = appSlice.actions
export default appSlice.reducer