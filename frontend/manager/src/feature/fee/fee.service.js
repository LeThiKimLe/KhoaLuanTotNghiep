import axiosClient from 'src/api/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getFee = createAsyncThunk('manager/fee/get', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('manager/service-fee')
        return response
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getTicketSale = createAsyncThunk(
    'manager/ticket-sale/get',
    async ({ month, year }, thunkAPI) => {
        try {
            const response = await axiosClient.get('manager/company/money', {
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

const getCompanySchedule = createAsyncThunk(
    'manager/ticket-sale/get',
    async ({ month, year }, thunkAPI) => {
        try {
            const response = await axiosClient.get('manager/schedules', {
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

const feeThunk = {
    getFee,
    getTicketSale,
    getCompanySchedule,
}

export default feeThunk
