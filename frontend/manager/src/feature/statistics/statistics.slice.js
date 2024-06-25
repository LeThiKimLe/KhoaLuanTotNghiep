import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import statisticsThunk from './statistics.service'
import { listTicket } from 'src/views/booking/test/data'

const initialState = {
    todayStatistics: [],
    monthStatistics: [],
    listOnlineTicket: [],
    listReview: [],
    listTicketCountByRoute: [],
    listTicketCountByCompany: [],
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
            .addCase(statisticsThunk.getAllReview.fulfilled, (state, action) => {
                state.listReview = action.payload
            })
            .addCase(statisticsThunk.countTicketByCompany.fulfilled, (state, action) => {
                state.listTicketCountByCompany = action.payload
            })
            .addCase(statisticsThunk.countTicketByRoute.fulfilled, (state, action) => {
                state.listTicketCountByRoute = action.payload
            })
    },
})

export const selectCurrentStatistics = (state) => state.statistics.todayStatistics
export const selectCurrentMonthStatistics = (state) => state.statistics.monthStatistics
export const selectListOnlineTicket = (state) => state.statistics.listOnlineTicket
export const selectListReview = (state) => state.statistics.listReview
export const selectListTicketCountByRoute = (state) => state.statistics.listTicketCountByRoute
export const selectListTicketCountByCompany = (state) => state.statistics.listTicketCountByCompany

export default statisticsSlice.reducer
