import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosClient from "../../api/axios"

const sendReview = createAsyncThunk('bookings/reviews', async ({rate, comment, scheduleId}, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/schedules/reviews', {
            rate: rate,
            scheduleId: scheduleId,
            comment: comment,
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const getUserReview = createAsyncThunk('/bookings/schedules/my-reviews', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('bookings/schedules/my-reviews')
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const getListReview = createAsyncThunk('/bookings/schedules/reviews/get', async (_, thunkAPI) => {
    try {
        const response = await axiosClient.get('bookings/schedules/reviews')
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const reviewThunk = {
    sendReview,
    getUserReview,
    getListReview,
}

export default reviewThunk