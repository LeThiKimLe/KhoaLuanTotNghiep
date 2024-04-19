import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from '../../api/axios'

const getRoute = createAsyncThunk('route/get', async (_, thunkAPI) => {
    try {
        const listRoute = await axiosClient.get('routes')
        return listRoute
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getOfficialRoute = createAsyncThunk('route/get/data', async (_, thunkAPI) => {
    try {
        const listRoute = await axiosClient.get('routes/data')
        return listRoute
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const addRoute = createAsyncThunk('manager/routes/add', async ({ routeData }, thunkAPI) => {
    try {
        const route = await axiosClient.post('manager/routes', {
            departureId: routeData.departureId,
            destinationId: routeData.destinationId,
            parents: 0,
        })
        return route
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const editRoute = createAsyncThunk('manager/routes/edit', async ({ routeInfor }, thunkAPI) => {
    try {
        const route = await axiosClient.put('manager/routes', {
            id: routeInfor.id,
            distance: routeInfor.distance,
            price: routeInfor.price,
            parents: routeInfor.parents,
            hours: routeInfor.hours,
            busType: routeInfor.busType,
        })
        return route
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const activeRoute = createAsyncThunk('manager/routes/active', async ({ id, active }, thunkAPI) => {
    try {
        const route = await axiosClient.put('manager/routes/active', {
            id: id,
            active: active,
        })
        return route
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getRouteParents = createAsyncThunk(
    'manager/routes/parent',
    async ({ departureId, destinationId }, thunkAPI) => {
        try {
            const route = await axiosClient.get('manager/routes/parent', {
                params: {
                    departureId: departureId,
                    destinationId: destinationId,
                },
            })
            return route
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const routeThunk = { getRoute, addRoute, editRoute, activeRoute, getRouteParents, getOfficialRoute }
export default routeThunk
