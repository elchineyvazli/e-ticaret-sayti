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
    totalServiceQuantity: 0
}


export const servicesSlice = createSlice({
    name: 'serviceReducer',
    initialState,
    reducers: {
        addToServiceBasket: (state, action) => {
            const service = state.services.find(el => el.id === action.payload);
            if (service) {
                service.quantity += 1;
                state.totalServiceQuantity += 1;
            }
        },
    },
})

export const { addToServiceBasket } = servicesSlice.actions

export default servicesSlice.reducer