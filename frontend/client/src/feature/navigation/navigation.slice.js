import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeLink: 'home'
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setActiveLink : (state, action) => {
            state.activeLink = action.payload
        }
    }
})

export const selectActiveLink = (state) => state.navigation.activeLink
export const navAction = navigationSlice.actions

export default navigationSlice.reducer