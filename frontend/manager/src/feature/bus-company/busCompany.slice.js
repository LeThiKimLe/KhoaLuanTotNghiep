import companyThunk from './busCompany.service'
import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const initialState = {
    loading: false,
    listRequest: [],
    listBusCompany: [],
    openListRequest: false,
    curCompany: null,
    listAssign: [],
    listCurCompanyReview: [],
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
            .addCase(companyThunk.getReview.fulfilled, (state, action) => {
                state.listCurCompanyReview = action.payload
            })
    },
})
export const selectListCompany = (state) => state.company.listBusCompany
export const selectListRequest = (state) => state.company.listRequest
export const selectOpenListRequest = (state) => state.company.openListRequest
export const selectCurCompany = (state) => state.company.curCompany
export const selectListAssign = (state) => state.company.listAssign
export const selectListCurCompanyReview = (state) => state.company.listCurCompanyReview

const companyPersistConfig = {
    key: 'company',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['curCompany', 'listAssign', 'listCompany'],
}

const companyReducer = persistReducer(companyPersistConfig, companySlice.reducer)

export const companyActions = companySlice.actions

export default companyReducer
