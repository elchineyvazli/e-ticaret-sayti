import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isDark: false,
    totalQuantity: 0
}


export const appSlice = createSlice({
    name: 'appReducer',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    }
})

export const { } = appSlice.actions

export default appSlice.reducer