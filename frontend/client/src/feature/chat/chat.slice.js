import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeLink: 'home'
}

const chatSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setActiveLink : (state, action) => {
            state.activeLink = action.payload
        }
    }
})

export const chatAction = chatSlice.actions

export default chatSlice.reducer