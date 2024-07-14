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
    async ({ feeServiceId, paymentMethod, transactionNo, transactionDate }, thunkAPI) => {
        try {
            const response = await axiosClient.post('admin/fee-payment', {
                feeServiceId: feeServiceId,
                paymentMethod: paymentMethod,
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

const getTicketOnlineSale = createAsyncThunk(
    'admin/ticket-online-sale',
    async ({ month, year }, thunkAPI) => {
        try {
            const response = await axiosClient.get('admin/money', {
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

const createStripePayment = createAsyncThunk('/stripe-create-payment', async (fee, thunkAPI) => {
    try {
        const response = await axiosClient.post('admin/fee-stripe-create-payment', {
            token: fee.id.toString(),
            amount: fee.fee,
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

const feeThunk = {
    getFee,
    getFeePaymentUrl,
    feePay,
    getTicketOnlineSale,
    createStripePayment,
}

export default feeThunk
