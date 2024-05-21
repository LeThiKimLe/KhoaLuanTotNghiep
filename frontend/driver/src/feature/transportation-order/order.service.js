import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'src/api/axios'

const getTransportationOrder = createAsyncThunk(
    'admin/transportation_order',
    async (scheduleId, thunkAPI) => {
        try {
            const listOrder = await axiosClient.get('driver/transportation-order', {
                params: {
                    scheduleId: scheduleId,
                },
            })
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

const updateOrder = createAsyncThunk(
    'driver/transportation_order/update',
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

const orderThunk = {
    getTransportationOrder,
    updateOrder,
}

export default orderThunk
