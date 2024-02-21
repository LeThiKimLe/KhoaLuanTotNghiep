import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTrip: null,
    returnTrip: null,
}

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        getCurTrip: (state, action) => {
            state.currentTrip = action.payload
        },
        getReturnTrip: (state, action) => {
            state.returnTrip = action.payload
        },
    }
}
)

export const tripActions = tripSlice.actions

export const selectCurrentTrip = state => state.trip.currentTrip
export const selectReturnTrip = state => state.trip.returnTrip

export default tripSlice.reducer