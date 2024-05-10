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

const feeThunk = {
    getFee,
}

export default feeThunk
