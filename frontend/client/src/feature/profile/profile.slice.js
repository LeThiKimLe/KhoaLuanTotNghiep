import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    active: 1,
    loading: false
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        setActive: (state, action) => {
            const {active} = action.payload
            state.active = active
        },
    }
})

export const selectActive = (state) => state.profile.active

export const profileAction = profileSlice.actions;

export default profileSlice.reducer