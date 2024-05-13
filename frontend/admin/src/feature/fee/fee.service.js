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

const getFeePaymentUrl = createAsyncThunk('admin/fee-payment', async (feeId, thunkAPI) => {
    try {
        const response = await axiosClient.get('admin/fee-payment', {
            params: {
                feeId: feeId,
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
})

const feePay = createAsyncThunk(
    'admin/fee-payment',
    async ({ feeServiceId, transactionNo, transactionDate }, thunkAPI) => {
        try {
            const response = await axiosClient.post('admin/fee-payment', {
                feeServiceId: feeServiceId,
                transactionNo: transactionNo,
                transactionDate: transactionDate,
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
    getFeePaymentUrl,
    feePay,
}

export default feeThunk
