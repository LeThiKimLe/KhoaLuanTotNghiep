import { createSlice } from '@reduxjs/toolkit'
import format from 'date-fns/format'
import scheduleThunk from './schedule.service'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

const initialState = {
    currentTrip: null,
    currentRoute: null,
    currentReverseTrip: null,
    currentDateScheduleGo: [],
    currentDateScheduleReturn: [],
    currentScheduleGo: [],
    currentScheduleReturn: [],
    currentTurn: 1,
    currentListDriver: [],
    currentListBus: [],
    listFixSchedule: [],
    currentWeekScheduleGo: [],
    currentWeekScheduleReturn: [],
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setCurrentTrip: (state, action) => {
            state.currentTrip = action.payload
        },
        setCurrentRoute: (state, action) => {
            state.currentRoute = action.payload
        },
        setCurrentReverseTrip: (state, action) => {
            state.currentReverseTrip = action.payload
        },
        setCurrentDateScheduleGo: (state, action) => {
            const listSchedule = action.payload
            state.currentDateScheduleGo = listSchedule.map((schd) => schd.departTime.slice(0, -3))
            state.currentScheduleGo = listSchedule
        },
        setCurrentDateScheduleReturn: (state, action) => {
            const listSchedule = action.payload
            state.currentDateScheduleReturn = listSchedule.map((schd) =>
                schd.departTime.slice(0, -3),
            )
            state.currentScheduleReturn = listSchedule
        },
        setCurrentTurn: (state, action) => {
            state.currentTurn = action.payload
        },
        setCurrentWeekScheduleGo: (state, action) => {
            state.currentWeekScheduleGo = action.payload
        },
        setCurrentWeekScheduleReturn: (state, action) => {
            state.currentWeekScheduleReturn = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(scheduleThunk.getTripBusDriver.fulfilled, (state, action) => {
                const { drivers, buses } = action.payload
                state.currentListDriver = drivers.filter((driver) => driver.account.active === true)
                state.currentListBus = buses.filter((bus) => bus.availability === 'Sẵn sàng')
            })
            .addCase(scheduleThunk.getTripBusDriver.rejected, (state) => {
                state.currentListDriver = []
                state.currentListBus = []
            })
            .addCase(scheduleThunk.getFixSchedule.fulfilled, (state, action) => {
                state.listFixSchedule = action.payload
            })
    },
})

export const selectCurrentTrip = (state) => state.schedule.currentTrip
export const selectCurrentRoute = (state) => state.schedule.currentRoute
export const selectCurrentReverse = (state) => state.schedule.currentReverseTrip
export const selectCurrentDateScheduleGo = (state) => state.schedule.currentDateScheduleGo
export const selectCurrentDateScheduleReturn = (state) => state.schedule.currentDateScheduleReturn
export const selectCurrentTurn = (state) => state.schedule.currentTurn
export const selectCurrentListDriver = (state) => state.schedule.currentListDriver
export const selectCurrentListBus = (state) => state.schedule.currentListBus
export const selectCurrentScheduleGo = (state) => state.schedule.currentScheduleGo
export const selectCurrentScheduleReturn = (state) => state.schedule.currentScheduleReturn
export const selectListFixSchedule = (state) => state.schedule.listFixSchedule
export const selectCurrentWeekScheduleGo = (state) => state.schedule.currentWeekScheduleGo
export const selectCurrentWeekScheduleReturn = (state) => state.schedule.currentWeekScheduleReturn

export const scheduleAction = scheduleSlice.actions

const schedulePersistConfig = {
    key: 'schedule',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['currentTrip', 'currentRoute'],
}

const scheduleReducer = persistReducer(schedulePersistConfig, scheduleSlice.reducer)

export default scheduleReducer
