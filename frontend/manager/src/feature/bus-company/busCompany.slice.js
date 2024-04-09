import companyThunk from './busCompany.service'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    listRequest: [],
    listBusCompany: [],
    openListRequest: false,
    curCompany: null,
    listAssign: [],
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
        setOpenListRequest: (state, action) => {
            state.openListRequest = action.payload
        },
        setCurCompany: (state, action) => {
            state.curCompany = action.payload
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
            .addCase(companyThunk.getAssignedRouteForCompany.fulfilled, (state, action) => {
                state.listAssign = action.payload
            })
    },
})
export const selectListCompany = (state) => state.company.listBusCompany
export const selectListRequest = (state) => state.company.listRequest
export const selectOpenListRequest = (state) => state.company.openListRequest
export const selectCurCompany = (state) => state.company.curCompany
export const selectListAssign = (state) => state.company.listAssign

export const companyActions = companySlice.actions

export default companySlice.reducer
