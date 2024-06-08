import staffThunk from './staff.service'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listManager: [],
    listAdmin: [],
    loading: false,
    currentStaff: null,
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setCurrentStaff: (state, action) => {
            state.currentStaff = action.payload
        },
        setCurrentDriver: (state, action) => {
            state.currentDriver = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(staffThunk.addManager.pending, (state) => {
                state.loading = true
            })
            .addCase(staffThunk.addManager.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(staffThunk.addManager.rejected, (state) => {
                state.loading = false
            })
            .addCase(staffThunk.getManagers.pending, (state) => {
                state.loading = true
            })
            .addCase(staffThunk.getManagers.fulfilled, (state, action) => {
                state.loading = false
                state.listManager = action.payload
            })
            .addCase(staffThunk.getManagers.rejected, (state) => {
                state.loading = false
            })
            .addCase(staffThunk.getAdmins.pending, (state) => {
                state.loading = true
            })
            .addCase(staffThunk.getAdmins.fulfilled, (state, action) => {
                state.loading = false
                state.listAdmin = action.payload
            })
            .addCase(staffThunk.getAdmins.rejected, (state) => {
                state.loading = false
            })
    },
})

export const selectLoadingState = (state) => state.staff.loading
export const selectListManager = (state) => state.staff.listManager
export const selectCurrentStaff = (state) => state.staff.currentStaff
export const selectListAdmin = (state) => state.staff.listAdmin

export const staffAction = staffSlice.actions

export default staffSlice.reducer
