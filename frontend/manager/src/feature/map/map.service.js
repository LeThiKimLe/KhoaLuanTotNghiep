import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getStationInfo = createAsyncThunk('map/getStationInfo', async (placeName, thunkAPI) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                placeName,
            )}&format=json&limit=1`,
        )
        if (response.data.length > 0) {
            const place = response.data[0]
            const address = place.display_name
            const latitude = place.lat
            const longitude = place.lon
            return { address, latitude, longitude }
        } else {
            console.log('Place not found')
            return thunkAPI.rejectWithValue('Place not found')
        }
    } catch (error) {
        console.error(error)
        return thunkAPI.rejectWithValue(error.message)
    }
})

const mapThunk = { getStationInfo }
export default mapThunk
