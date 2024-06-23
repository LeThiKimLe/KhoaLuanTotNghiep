import axiosClient from 'src/api/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getTodayStatistics = createAsyncThunk('admin/trips/statistic', async (_, thunkAPI) => {
    try {
        const result = await axiosClient.get('admin/trips/statistic', {
            params: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
            },
        })
        return result.statisticForDays
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getCurrentMonthStatistics = createAsyncThunk(
    'admin/trips/statistic/month',
    async (_, thunkAPI) => {
        try {
            const result = await axiosClient.get('admin/trips/statistic', {
                params: {
                    year: new Date().getFullYear(),
                    month: 0,
                },
            })
            return result.statisticFor
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const getStatistics = createAsyncThunk(
    'admin/trips/statistic',
    async ({ year, month }, thunkAPI) => {
        try {
            const result = await axiosClient.get('admin/trips/statistic', {
                params: {
                    year: year,
                    month: month + 1,
                },
            })
            return result.statisticForDays
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const getStatisticsTrip = createAsyncThunk(
    'admin/trips/statistic/trip',
    async ({ year, month }, thunkAPI) => {
        try {
            const result = await axiosClient.get('admin/trips/statistic-trip', {
                params: {
                    year: year,
                    month: month + 1,
                },
            })
            return result
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const getOnlineTicket = createAsyncThunk(
    'manager/company/ticket',
    async ({ month, year }, thunkAPI) => {
        try {
            const response = await axiosClient.get('manager/tickets-month', {
                params: {
                    month: month,
                    year: year,
                },
            })
            return response
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const getAllReview = createAsyncThunk('admin/review', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('bookings/schedules/reviews')
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
const statisticsThunk = {
    getTodayStatistics,
    getCurrentMonthStatistics,
    getStatistics,
    getStatisticsTrip,
    getOnlineTicket,
    getAllReview,
}
export default statisticsThunk
