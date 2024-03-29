import companyThunk from './busCompany.service'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    listRequest: [],
    listBusCompany: [],
}

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        getBusRequest: (state, action) => {
            state.listRequest = action.payload
        },
        addRequest: (state, action) => {
            state.listRequest = [...state.listRequest, action.payload]
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(companyThunk.getCompany.pending, (state) => {
                state.loading = true
            })
            .addCase(companyThunk.getCompany.fulfilled, (state, action) => {
                state.loading = false
                state.listBusCompany = action.payload
            })
            .addCase(companyThunk.getCompany.rejected, (state) => {
                state.loading = false
            })
    },
})
export const selectListCompany = (state) => state.company.listBusCompany
export const selectListRequest = (state) => state.company.listRequest

export const companyActions = companySlice.actions

export default companySlice.reducer
