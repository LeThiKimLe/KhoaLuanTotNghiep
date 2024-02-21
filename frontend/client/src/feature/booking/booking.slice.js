import { createSlice } from "@reduxjs/toolkit";
import bookingThunk from "./booking.service";

const initialState = {
    bookingInfor: null,
    loading: false,
    message: '',
    bookingCode: '',
    bookingSessionTime: null,
    error: false,
    bookingHistory: null,
    userBookingHistory: []
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        saveInfor: (state, action) => {
            state.bookingInfor= action.payload
        },
        reset: (state) => {
            state.bookingInfor = null
            state.loading = false
            state.message = ''
            state.error = false
            state.bookingHistory = null
        },
        resetMessage: (state) => {
            state.message = ''
            state.error = false
        },
        updateBookingSession: (state, action) => {
            state.bookingCode = action.payload.bookingCode
            state.bookingSessionTime = action.payload.bookingSession
            state.bookingInfor = action.payload.bookingInfor
        },
        clearBookingSession: (state) => {
            state.bookingSessionTime = null
            state.bookingCode = ''
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(bookingThunk.bookingForGuest.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.bookingForGuest.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message || "Đã đặt giữ chỗ thành công. Hãy thanh toán trong 10 phút"
            state.bookingCode = action.payload.code
            state.bookingSessionTime = action.payload.bookingDate
            state.error = false
        })
        .addCase(bookingThunk.bookingForGuest.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })

        .addCase(bookingThunk.bookingForUser.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.bookingForUser.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message || "Đã đặt giữ chỗ thành công. Hãy thanh toán trong 10 phút"
            state.bookingCode = action.payload.code
            state.bookingSessionTime = action.payload.bookingDate
            state.error = false
        })
        .addCase(bookingThunk.bookingForUser.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })

        .addCase(bookingThunk.getBookingInfor.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.getBookingInfor.fulfilled, (state, action) => {
            state.loading = false
            state.bookingHistory = action.payload
            state.error = false
        })
        .addCase(bookingThunk.getBookingInfor.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
            state.bookingHistory = null
        })

        .addCase(bookingThunk.bookingPayment.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.bookingPayment.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload
            state.bookingSessionTime = null
            state.bookingCode = ''
            state.error = false
        })
        .addCase(bookingThunk.bookingPayment.rejected, (state, action) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })

        .addCase(bookingThunk.cancelPayment.fulfilled, (state, action) => {
            state.error = false
        })
        .addCase(bookingThunk.cancelPayment.rejected, (state, action) => {
            state.error = true
            state.message = action.payload
        })

        .addCase(bookingThunk.getUserHistory.pending, (state) => {
            state.loading = true
        })
        .addCase(bookingThunk.getUserHistory.fulfilled, (state, action) => {
            state.loading = false
            state.userBookingHistory = action.payload
            state.error = false
        })
        .addCase(bookingThunk.getUserHistory.rejected, (state) => {
            state.error = true
            state.loading = false
            state.userBookingHistory = []
        })

        .addCase(bookingThunk.keepPayment.fulfilled, (state, action) => {
            state.loading = false
            state.bookingSessionTime = action.payload.bookingDate
            state.error = false
        })
        .addCase(bookingThunk.keepPayment.rejected, (action,state) => {
            state.error = true
            state.loading = false
            state.message = action.payload
        })
    }
})

export const bookingActions = bookingSlice.actions

export const selectLoading = state => state.booking.loading
export const selectMessage = state => state.booking.message
export const selectError = state => state.booking.error
export const selectBookingInfor = state => state.booking.bookingInfor
export const selectBookingSessionTime = state => state.booking.bookingSessionTime
export const selectBookingCode = state => state.booking.bookingCode
export const selectBookingHistory = state => state.booking.bookingHistory
export const selectUserBookingHistory = state => state.booking.userBookingHistory

export default bookingSlice.reducer
