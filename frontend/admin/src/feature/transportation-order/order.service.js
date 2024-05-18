import { createAsyncThunk } from '@reduxjs/toolkit'

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
            const result = await axiosClient.post('admin/transportation_order', {
                scheduleId: scheduleId,
                file: file,
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

const updateOrder = createAsyncThunk(
    'admin/transportation_order/update',
    async ({ id, status, file }, thunkAPI) => {
        try {
            const result = await axiosClient.put('driver/transportation_order', {
                id: id,
                status: status,
                file: file,
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

const orderThunk = {
    getTransportationOrder,
    createOrder,
    updateOrder,
}

export default orderThunk
