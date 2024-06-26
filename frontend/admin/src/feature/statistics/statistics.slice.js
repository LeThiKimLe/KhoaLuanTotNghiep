import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import statisticsThunk from './statistics.service'

const initialState = {
    todayStatistics: [],
    monthStatistics: [],
    listOnlineTicket: [],
}

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    // reducers: {
    //     setSearch: (state, action) => {
    //         const searchInfor = action.payload
    //         state.infor = searchInfor
    //     },
    // },
    extraReducers: (builder) => {
        builder
            .addCase(statisticsThunk.getTodayStatistics.fulfilled, (state, action) => {
                state.todayStatistics = action.payload
            })
            .addCase(statisticsThunk.getCurrentMonthStatistics.fulfilled, (state, action) => {
                state.monthStatistics = action.payload
            })
            .addCase(statisticsThunk.getOnlineTicket.fulfilled, (state, action) => {
                state.listOnlineTicket = action.payload
            })
    },
})

export const selectCurrentStatistics = (state) => state.statistics.todayStatistics
export const selectCurrentMonthStatistics = (state) => state.statistics.monthStatistics
export const selectListOnlineTicket = (state) => state.statistics.listOnlineTicket

export default statisticsSlice.reducer
