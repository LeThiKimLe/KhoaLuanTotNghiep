import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

const bookingForGuest = createAsyncThunk('bookings-guest', async (bookingInfor, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/booking-guest',
            {
                ticketNumber: bookingInfor.bookedSeat.length,
                name: bookingInfor.bookingUser.name,
                email: bookingInfor.bookingUser.email,
                tel: bookingInfor.bookingUser.tel,
                tripId: bookingInfor.bookingTrip.tripInfor.id,
                scheduleId: bookingInfor.bookingTrip.id,
                pickStationId: bookingInfor.pickPoint,
                dropStationId: bookingInfor.dropPoint,
                seatName: bookingInfor.bookedSeat
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const bookingForUser = createAsyncThunk('bookings-user', async (bookingInfor, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/booking-users',
            {
                ticketNumber: bookingInfor.bookedSeat.length,
                name: bookingInfor.bookingUser.name,
                email: bookingInfor.bookingUser.email,
                tel: bookingInfor.bookingUser.tel,
                tripId: bookingInfor.bookingTrip.tripInfor.id,
                scheduleId: bookingInfor.bookingTrip.id,
                pickStationId: bookingInfor.pickPoint,
                dropStationId: bookingInfor.dropPoint,
                seatName: bookingInfor.bookedSeat
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const getBookingInfor = createAsyncThunk('bookings/tickets', async ({ searchInfor, captcha }, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/tickets',
            {
                tel: searchInfor.tel,
                bookingCode: searchInfor.booking_code,
                capchaToken: captcha
            }
        )
        return response
    }
    catch (error) {
        let message = '';
        if (error.response) {
            if (error.response.status === 400) {
                message = 'Vui lòng xác minh mã CAPTCHA';
            } else if (error.response.status === 404) {
                message = 'Không tìm thấy thông tin';
            }
            else {
                message = 'Không tìm thấy thông tin' || error.response.data && error.response.data.message ? error.response.data.message : error.message;
            }
        } else {
            message = 'Không tìm thấy thông tin' || error.message || error.toString();
        }
        return thunkAPI.rejectWithValue(message);
    }
}
)

const bookingPayment = createAsyncThunk('tickets/payment', async ({bookingCode, payment}, thunkAPI) => {
    try {
        const response = await axiosClient.put('tickets/payment',
            {
                bookingCode: bookingCode,
                paymentMethod: payment
            }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const cancelPayment = createAsyncThunk('bookings/cancel', async (bookingCode, thunkAPI) => {
    try {
        const response = await axiosClient.put('bookings/cancel',null,{
            params: {
                "bookingCode": bookingCode
            }
        }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const getUserHistory = createAsyncThunk('bookings/booking-history', async (_,thunkAPI) => {
    try {
        const response = await axiosClient.get('bookings/booking-history')
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const keepPayment = createAsyncThunk('bookings/keep-booking', async (bookingCode, thunkAPI) => {
    try {
        const response = await axiosClient.post('bookings/keep-booking',null,{
            params: {
                "bookingCode": bookingCode
            }
        }
        )
        return response
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}
)

const bookingThunk = {
    bookingForGuest,
    bookingForUser,
    getBookingInfor,
    bookingPayment,
    cancelPayment,
    getUserHistory,
    keepPayment,
}

export default bookingThunk