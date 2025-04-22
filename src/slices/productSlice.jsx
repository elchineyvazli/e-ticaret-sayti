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

// 🔧 return eksikti
const recalculateProductQuantity = (products) =>
    products.reduce((sum, item) => sum + item.quantity, 0);

export const appSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        addToProductBasket: (state, action) => {
            const id = action.payload[0];
            const amountToAdd = action.payload[1];

            const productIndex = state.products.findIndex(p => p.id === id);
            if (productIndex === -1) return;

            const product = state.products[productIndex];
            const total_quantity = product.total_quantity;

            // Sepette varsa, önceki miktarı al
            const existingItem = state.products_in_basket.find(item => item.id === id);
            const existingQuantity = existingItem?.quantity || 0;

            // 🔐 Yeni toplam miktarı hesapla
            const newTotalQuantity = existingQuantity + amountToAdd;

            if (newTotalQuantity > total_quantity) {
                alert(`Stokda yalnız ${total_quantity} ədəd var!`);
                return;
            }

            const updatedProduct = {
                ...product,
                quantity: amountToAdd,
                total_quantity,
            };

            // Ürünü güncelle
            state.products[productIndex] = updatedProduct;

            // 🔁 Sepette varsa üzerine ekle, yoksa yeni ekle
            const basketIndex = state.products_in_basket.findIndex(item => item.id === id);
            if (basketIndex === -1) {
                state.products_in_basket.push({ ...updatedProduct });
            } else {
                state.products_in_basket[basketIndex].quantity += amountToAdd;
            }

            // Fiyat ve sayaçları güncelle
            state.total_price = calculateTotalPrice(state.products_in_basket);
            state.productQuantity = recalculateProductQuantity(state.products_in_basket);
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
            state.productQuantity = recalculateProductQuantity(state.products_in_basket);
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
            state.productQuantity = recalculateProductQuantity(state.products_in_basket);
        },

        clearBasket: (state) => {
            state.products_in_basket = [];
            state.total_price = 0;
            state.productQuantity = 0;
        },

        removeFromBasket: (state, action) => {
            state.products_in_basket = state.products_in_basket.filter(item => item.id !== action.payload);
            state.total_price = calculateTotalPrice(state.products_in_basket);
            state.productQuantity = recalculateProductQuantity(state.products_in_basket); // 🔧 sabitlendi
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
