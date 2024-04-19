import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'src/api/axios'
import { reverseString } from 'src/utils/tripUtils'

const addTrip = createAsyncThunk('manager/trips', async (tripInfor, thunkAPI) => {
    try {
        const trip = await axiosClient.post('manager/trips', {
            routeId: tripInfor.routeId,
            startStationId: tripInfor.startStationId,
            endStationId: tripInfor.endStationId,
            price: tripInfor.price,
            companyId: tripInfor.companyId,
            busType: 0,
            schedule: tripInfor.schedule,
            scheduleReturn: reverseString(tripInfor.schedule, '-'),
            distance: tripInfor.distance,
            hours: tripInfor.hours,
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

const activeTrip = createAsyncThunk('manager/trips/active', async ({ id, active }, thunkAPI) => {
    try {
        const result = await axiosClient.put('manager/trips/active', {
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

const tripThunk = { addTrip, activeTrip }
export default tripThunk
