import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'src/api/axios'

const getLocations = createAsyncThunk('manager/locations/get', async (_, thunkAPI) => {
    try {
        const listLocations = await axiosClient.get('manager/locations')
        return listLocations
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const addLocation = createAsyncThunk('manager/locations/add', async (nameLocation, thunkAPI) => {
    try {
        const location = await axiosClient.post('manager/locations', null, {
            params: { name: nameLocation },
        })
        return location
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const editLocation = createAsyncThunk('manager/locations/edit', async ({ id, name }, thunkAPI) => {
    try {
        const location = await axiosClient.put('manager/locations', { id: id, name: name })
        return location
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const activeLocation = createAsyncThunk(
    'manager/locations/active',
    async ({ id, active }, thunkAPI) => {
        try {
            const location = await axiosClient.put('manager/locations/active', {
                id: id,
                active: active,
            })
            return location
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const locationThunk = { getLocations, addLocation, editLocation, activeLocation }
export default locationThunk
