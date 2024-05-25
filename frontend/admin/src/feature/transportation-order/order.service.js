import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'src/api/axios'

const getTransportationOrder = createAsyncThunk(
    'admin/transportation_order',
    async (_, thunkAPI) => {
        try {
            const listOrder = await axiosClient.get('admin/transportation_order')
            return listOrder
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const createOrder = createAsyncThunk(
    'admin/transportation_order/create',
    async ({ scheduleId, file }, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('scheduleId', scheduleId)
            if (file) formData.append('file', file)
            else formData.append('file', new File([], 'empty-file.txt'))
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const result = await axiosClient.post('admin/transportation_order', formData, config)
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

const updateOrder = createAsyncThunk(
    'admin/transportation_order/update',
    async ({ id, status, file }, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('status', status)
            if (file) formData.append('file', file)
            else formData.append('file', new File([], 'empty-file.txt'))
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const result = await axiosClient.put('driver/transportation-order', formData, config)
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

const deleteOrder = createAsyncThunk('admin/transportation_order/delete', async (id, thunkAPI) => {
    try {
        const result = await axiosClient.delete(
            `admin/transportation_order?transportationOrderId=${id}`,
        )
        return result
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const orderThunk = {
    getTransportationOrder,
    createOrder,
    updateOrder,
    deleteOrder,
}

export default orderThunk
