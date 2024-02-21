import seatThunk from "./seat.service";
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const initialState = {
    seatMap: null
}

const seatSlice = createSlice({
    name: 'seat',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(seatThunk.getSeatMap.fulfilled, (state, action) => {
            state.seatMap = action.payload
        })
    }
})

export const selectSeatMap = state => state.seat.seatMap

const seatPersistConfig = {
    key: 'seatmap',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['seatMap']
}

const seatReducer = persistReducer(seatPersistConfig, seatSlice.reducer)

export default seatReducer