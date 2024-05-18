import { createAsyncThunk } from "@reduxjs/toolkit";

const getTransportationOrder = createAsyncThunk('driver/transportation_order', async (scheduleId, thunkAPI) => {
    try {
        const listOrder = await axiosClient.get('driver/transportation_order', {
            params: {
                scheduleId: scheduleId,
            }
        })
        return listOrder
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const updateOrder = createAsyncThunk('driver/transportation_order/update', async ({id, status, file}, thunkAPI) => {
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
})

const orderThunk = {
    getTransportationOrder,
    updateOrder,
}

export default orderThunk