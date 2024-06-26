import { createAsyncThunk } from '@reduxjs/toolkit'
import { tr } from 'date-fns/locale'
import axiosClient from 'src/api/axios'

const addTrip = createAsyncThunk('admin/trips', async (tripInfor, thunkAPI) => {
    try {
        const trip = await axiosClient.post('admin/trips', {
            routeId: tripInfor.routeId,
            startStationId: tripInfor.startStationId,
            endStationId: tripInfor.endStationId,
        })
        return trip
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const activeTrip = createAsyncThunk('admin/trips/active', async ({ id, active }, thunkAPI) => {
    try {
        const result = await axiosClient.put('admin/trips/active', {
            id: id,
            active: active,
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

const editTrip = createAsyncThunk('admin/trips/edit', async (tripInfor, thunkAPI) => {
    try {
        const trip = await axiosClient.put('admin/trips', {
            tripId: tripInfor.tripId,
            price: tripInfor.price,
            schedule: tripInfor.schedule,
            busTypeId: tripInfor.busTypeId,
        })
        return trip
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const tripThunk = { addTrip, activeTrip, editTrip }
export default tripThunk
