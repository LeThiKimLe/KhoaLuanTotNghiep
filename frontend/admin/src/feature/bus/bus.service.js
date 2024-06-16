import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosClient from 'src/api/axios'
import format from 'date-fns/format'
const getBusType = createAsyncThunk('admin/bus/types', async (_, thunkAPI) => {
    try {
        const listBusType = await axiosClient.get('admin/bus/types')
        return listBusType
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getBus = createAsyncThunk('admin/bus/get', async (_, thunkAPI) => {
    try {
        const listBus = await axiosClient.get('admin/bus')
        return listBus
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const addBus = createAsyncThunk('admin/bus/add', async (busInfor, thunkAPI) => {
    try {
        const bus = await axiosClient.post('admin/bus', {
            manufactureYear: busInfor.year,
            color: busInfor.color,
            licensePlate: busInfor.license,
            typeId: busInfor.typeId,
            companyId: busInfor.companyId,
        })
        return bus
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const editBus = createAsyncThunk('admin/bus/edit', async (busInfor, thunkAPI) => {
    try {
        const result = await axiosClient.put('admin/bus', null, {
            params: {
                id: busInfor.id,
                manufactureYear: busInfor.year,
                color: busInfor.color,
                licensePlate: busInfor.license,
                availability: busInfor.availability,
                typeId: busInfor.typeId,
            },
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

const updateBusState = createAsyncThunk('admin/bus/state', async ({ id, busState }, thunkAPI) => {
    try {
        const bus = await axiosClient.put('driver/bus/state', null, {
            params: {
                id: id,
                brake: busState.brake,
                lighting: busState.lighting,
                tire: busState.tire,
                steering: busState.steering,
                mirror: busState.mirror,
                airCondition: busState.airCondition,
                electric: busState.electric,
                fuel: busState.fuel,
                updatedAt: format(new Date(), 'yyyy-MM-dd'),
                overallState: busState.overallState,
            },
        })
        return bus
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const distributeBus = createAsyncThunk(
    'admin/trips/distribute/bus',
    async ({ tripId, busId }, thunkAPI) => {
        try {
            const bus = await axiosClient.post('admin/trips/distribute', {
                tripId: tripId,
                busId: [busId],
                driverId: [],
            })
            return bus
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

const deleteDistributeBus = createAsyncThunk(
    'admin/trips/distribute/bus/delete',
    async ({ tripId, busId }, thunkAPI) => {
        try {
            const result = await axiosClient.delete('admin/trips/distribute', {
                data: {
                    tripId: tripId,
                    busId: [busId],
                    driverId: [],
                },
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

const getTrips = createAsyncThunk('admin/bus/trips', async (busId, thunkAPI) => {
    try {
        const listTrip = await axiosClient.get('driver/bus/trips', {
            params: {
                busId: busId,
            },
        })
        return listTrip
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getSchedules = createAsyncThunk('admin/bus/schedules', async (busId, thunkAPI) => {
    try {
        const listTrip = await axiosClient.get('driver/bus/schedules', {
            params: {
                busId: busId,
            },
        })
        return listTrip
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getTripBus = createAsyncThunk('trip/get-bus', async (tripId, thunkAPI) => {
    try {
        const response = await axiosClient.get('manager/trips/driver-bus', {
            params: {
                tripId: tripId,
            },
        })
        return response.buses
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const addSeatMap = createAsyncThunk('admin/seatmap/add', async (busSeatMap, thunkAPI) => {
    try {
        const result = await axiosClient.post('admin/bus/seat-map', {
            rowNo: busSeatMap.rowNo,
            floorNo: busSeatMap.floorNo,
            colNo: busSeatMap.colNo,
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

const addListSeat = createAsyncThunk(
    'admin/bus/type/seat/add',
    async ({ seatMapId, seatInfors }, thunkAPI) => {
        try {
            const result = await axiosClient.post('admin/bus/seat', {
                seatMapId: seatMapId,
                seatInfors: seatInfors,
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

const addBusType = createAsyncThunk(
    'admin/bus/type/add',
    async ({ busType, seatMapId }, thunkAPI) => {
        try {
            const result = await axiosClient.post('admin/bus/type', {
                name: busType.name,
                capacity: busType.capacity,
                fee: busType.fee,
                description: busType.description,
                seatMapId: seatMapId,
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

const addBusTypeWithImage = createAsyncThunk(
    'admin/bus/type/add-type',
    async ({ busType, seatMapId }, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('id', busType.id)
            formData.append('name', busType.name)
            formData.append('capacity', busType.capacity)
            formData.append('fee', busType.fee)
            formData.append('description', busType.description)
            formData.append('seatMapId', seatMapId)
            formData.append('wifi', busType.wifi)
            formData.append('water', busType.water)
            formData.append('coolTissue', busType.coolTissue)
            formData.append('phoneCharge', busType.phoneCharge)
            formData.append('blanket', busType.blanket)
            formData.append('pillow', busType.pillow)
            formData.append('breakingHammer', busType.breakingHammer)
            formData.append('conditioner', busType.conditioner)
            formData.append('toilet', busType.toilet)
            formData.append('readingLight', busType.readingLight)
            formData.append('curtain', busType.curtain)
            formData.append('tiviLed', busType.tiviLed)
            if (busType.file) formData.append('image', busType.file)
            else formData.append('image', new File([], 'empty-file.txt'))
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const result = await axiosClient.post('admin/bus/type', formData, config)
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

const updateBusTypeData = createAsyncThunk(
    'admin/bus/type/update',
    async ({ busTypeData }, thunkAPI) => {
        try {
            const formData = new FormData()
            formData.append('id', busTypeData.id)
            formData.append('name', busTypeData.name)
            formData.append('capacity', busTypeData.capacity)
            formData.append('fee', busTypeData.fee)
            formData.append('description', busTypeData.description)
            formData.append('seatMapId', busTypeData.seatMapId)
            formData.append('wifi', busTypeData.wifi)
            formData.append('water', busTypeData.water)
            formData.append('coolTissue', busTypeData.coolTissue)
            formData.append('phoneCharge', busTypeData.phoneCharge)
            formData.append('blanket', busTypeData.blanket)
            formData.append('pillow', busTypeData.pillow)
            formData.append('breakingHammer', busTypeData.breakingHammer)
            formData.append('conditioner', busTypeData.conditioner)
            formData.append('toilet', busTypeData.toilet)
            formData.append('readingLight', busTypeData.readingLight)
            formData.append('curtain', busTypeData.curtain)
            formData.append('tiviLed', busTypeData.tiviLed)
            if (busTypeData.file) formData.append('image', busTypeData.file)
            else formData.append('image', new File([], 'empty-file.txt'))
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const result = await axiosClient.put('admin/bus/type', formData, config)
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

const activeBusType = createAsyncThunk(
    'admin/bus/type/active',
    async ({ id, active }, thunkAPI) => {
        try {
            const result = await axiosClient.put('admin/bus/type/state', {
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
    },
)

const busThunk = {
    getBus,
    addBus,
    editBus,
    updateBusState,
    getBusType,
    distributeBus,
    getTrips,
    getSchedules,
    getTripBus,
    deleteDistributeBus,
    addSeatMap,
    addListSeat,
    addBusType,
    updateBusTypeData,
    addBusTypeWithImage,
    activeBusType,
}
export default busThunk
