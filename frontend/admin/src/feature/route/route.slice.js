import routeThunk from './route.service'
import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const initialState = {
    listRoute: [],
    listOfficialRoute: [],
    loading: false,
    isUpdateRoute: false,
    listCompanyRoute: [],
}

const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        setUpdateState: (state, action) => {
            state.isUpdateRoute = action.payload
        },
        setCompanyRoute: (state, action) => {
            state.listCompanyRoute = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(routeThunk.getRoute.pending, (state) => {
                state.loading = true
            })
            .addCase(routeThunk.getRoute.fulfilled, (state, action) => {
                state.listRoute = action.payload
                state.loading = false
            })
            .addCase(routeThunk.addRoute.pending, (state) => {
                state.loading = true
            })
            .addCase(routeThunk.addRoute.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(routeThunk.addRoute.rejected, (state) => {
                state.loading = false
            })
            .addCase(routeThunk.editRoute.pending, (state) => {
                state.loading = true
            })
            .addCase(routeThunk.editRoute.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(routeThunk.editRoute.rejected, (state) => {
                state.loading = false
            })
            .addCase(routeThunk.activeRoute.pending, (state) => {
                state.loading = true
            })
            .addCase(routeThunk.activeRoute.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(routeThunk.activeRoute.rejected, (state) => {
                state.loading = false
            })
            .addCase(routeThunk.getRouteParents.pending, (state) => {
                state.loading = true
            })
            .addCase(routeThunk.getRouteParents.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(routeThunk.getRouteParents.rejected, (state) => {
                state.loading = false
            })
            .addCase(routeThunk.getOfficialRoute.pending, (state) => {
                state.loading = true
            })
            .addCase(routeThunk.getOfficialRoute.fulfilled, (state, action) => {
                state.listOfficialRoute = action.payload
                state.loading = false
            })
    },
})

export const selectListRoute = (state) => state.route.listRoute
export const selectListOfficialRoute = (state) => state.route.listOfficialRoute
export const selectLoadingState = (state) => state.route.loading
export const selectListCompanyRoute = (state) => state.route.listCompanyRoute
export const routeAction = routeSlice.actions

const routePersistConfig = {
    key: 'route',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['listOfficialRoute', 'listRoute', 'listCompanyRoute'],
}

const routeReducer = persistReducer(routePersistConfig, routeSlice.reducer)

export default routeReducer
