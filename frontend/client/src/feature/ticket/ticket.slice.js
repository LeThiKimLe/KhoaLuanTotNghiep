import { createSlice } from "@reduxjs/toolkit";
import ticketThunk from "./ticket.service";

const initialState = {
    currentTicket: null,
    active: 1,
    loading: false,
    message:'',
    error: false,
    process: 1,
    finishAction: false,
    newTrip: null,
    listChange: [],
    listNew: [],
    modifiedTrip: null
}

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers:{
        setActive: (state, action) => {
            const {active} = action.payload
            state.active = active
        },
        setMessage: (state, action) => {
            state.message = action.payload.message
            state.error = action.payload.error
        },
        reset: (state) => {
            state.message = ''
            state.error = false
            state.process = 1
            state.finishAction = false
            state.newTrip = null
            state.listChange = []
            state.listNew = []
            state.modifiedTrip = null
        },
        setCurrentTicket : (state, action) => {
            state.currentTicket = action.payload
        },
        comeBackward: (state) => {
            if (state.process > 1)
                state.process = state.process - 1
        },
        comeForward: (state) => {
            state.process = state.process + 1
        },
        finishAction: (state) => {
            state.finishAction = true
        },
        setModifiedTrip: (state, action) => {
            state.modifiedTrip = action.payload
        },
        setNewTrip: (state, action) => {
            state.newTrip = action.payload
        },
        setListChange: (state, action) => {
            state.listChange = action.payload
        },
        setNewChangeInfor: (state, action) => {
            state.listNew = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(ticketThunk.cancelTicket.pending, (state) => {
            state.loading = true
        })
        .addCase(ticketThunk.cancelTicket.fulfilled, (state, action) => {
            state.loading = false
            state.newTrip = null
            state.listChange = []
            state.listNew = []
            state.error = false
        })
        .addCase(ticketThunk.cancelTicket.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })

        .addCase(ticketThunk.changeTicket.pending, (state) => {
            state.loading = true
        })
        .addCase(ticketThunk.changeTicket.fulfilled, (state, action) => {
            state.loading = false
            // state.newTrip = null
            state.listChange = []
            state.listNew = []
            state.error = false
        })
        .addCase(ticketThunk.changeTicket.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })
        .addCase(ticketThunk.verifyCancelTicketPolicy.pending, (state) => {
            state.loading = true
        })
        .addCase(ticketThunk.verifyCancelTicketPolicy.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
        })
        .addCase(ticketThunk.verifyCancelTicketPolicy.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })
        .addCase(ticketThunk.editTicket.pending, (state) => {
            state.loading = true
        })
        .addCase(ticketThunk.editTicket.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
        })
        .addCase(ticketThunk.editTicket.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })
    }
})

export const selectActive = (state) => state.ticket.active
export const selectMessage = (state) => state.ticket.message
export const selectError = (state) => state.ticket.error
export const selectCurrentTicket = (state) => state.ticket.currentTicket
export const selectProcess = (state) => state.ticket.process
export const selectFinishedState = (state) => state.ticket.finishAction
export const selectNewTrip = (state) => state.ticket.newTrip
export const selectChangeInfor = (state) => state.ticket.listChange
export const selectNewSeat = (state) => state.ticket.listNew
export const selectLoading = (state) => state.ticket.loading
export const selectModifiedTrip = (state) => state.ticket.modifiedTrip

export const ticketAction = ticketSlice.actions

export default ticketSlice.reducer