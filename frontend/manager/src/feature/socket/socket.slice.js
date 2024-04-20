import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentConnection: null,
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.currentConnection = action.payload
        },
        removeConnection: (state) => {
            state.currentConnection = null
        },
    },
})

export const selectConnection = (state) => state.socket.currentConnection
export const socketAction = socketSlice.actions
export default socketSlice.reducer
