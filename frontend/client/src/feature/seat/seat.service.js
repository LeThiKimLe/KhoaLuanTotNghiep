import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

const getSeatMap = createAsyncThunk('seat/seat-map', async (_,thunkAPI) => {
    try{
        const seatMap = await axiosClient.get('seat-map')
        return seatMap
    }
    catch(error){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const seatThunk = {getSeatMap}
export default seatThunk