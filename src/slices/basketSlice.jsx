import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    services: [
        {
            id: 1,
            name: "Antivirus",
            price: "1000",
            quantity: 0,
            description: "1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur, quam at finibus commodo, leo felis mollis turpis, sed bibendum eros nulla sed mi.1",
            seller: "Elchin"
        },
        {
            id: 2,
            name: "P2P",
            price: "650",
            quantity: 0,
            description: "2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur, quam at finibus commodo, leo felis mollis turpis, sed bibendum eros nulla sed mi.2",
            seller: "Ramin"
        },
        {
            id: 3,
            name: "Game",
            price: "1400",
            quantity: 0,
            description: "3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur, quam at finibus commodo, leo felis mollis turpis, sed bibendum eros nulla sed mi.3",
            seller: "Anar"
        }
    ],
    totalQuantity: 0
}

export const basketSlice = createSlice({
    name: 'basketReducer',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.services.forEach(el => {
                if (el.id == action.payload) {
                    el.quantity += 1;
                    state.totalQuantity += 1;
                }
            });
        },
    },
})

export const { addToBasket } = basketSlice.actions

export default basketSlice.reducer