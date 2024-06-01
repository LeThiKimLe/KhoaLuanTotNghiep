import feeThunk from './fee.service'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listFee: [],
    serviceDueDate: new Date(),
}

const feeSlice = createSlice({
    name: 'fee',
    initialState,
    reducers: {
        setServiceDueDate: (state, action) => {
            state.serviceDueDate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(feeThunk.getFee.fulfilled, (state, action) => {
            state.listFee = action.payload
        })
    },
})

export const selectListFee = (state) => state.fee.listFee
export const selectServiceDueDate = (state) => state.fee.serviceDueDate
export const feeAction = feeSlice.actions
export default feeSlice.reducer
