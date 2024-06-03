import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";

const bookingForGuest = createAsyncThunk(
  "bookings-guest",
  async (bookingInfor, thunkAPI) => {
    try {
      const response = await axiosClient.post("bookings/booking-guest", {
        ticketNumber: bookingInfor.bookedSeat.length,
        name: bookingInfor.bookingUser.name,
        email: bookingInfor.bookingUser.email,
        tel: bookingInfor.bookingUser.tel,
        tripId: bookingInfor.bookingTrip.tripInfor.id,
        scheduleId: bookingInfor.bookingTrip.id,
        pickStationId: bookingInfor.pickPoint,
        dropStationId: bookingInfor.dropPoint,
        seatName: bookingInfor.bookedSeat,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const bookingForUser = createAsyncThunk(
  "bookings-user",
  async (bookingInfor, thunkAPI) => {
    try {
      const response = await axiosClient.post("bookings/booking-users", {
        ticketNumber: bookingInfor.bookedSeat.length,
        name: bookingInfor.bookingUser.name,
        email: bookingInfor.bookingUser.email,
        tel: bookingInfor.bookingUser.tel,
        tripId: bookingInfor.bookingTrip.tripInfor.id,
        scheduleId: bookingInfor.bookingTrip.id,
        pickStationId: bookingInfor.pickPoint,
        dropStationId: bookingInfor.dropPoint,
        seatName: bookingInfor.bookedSeat,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const getBookingInfor = createAsyncThunk(
  "bookings/tickets",
  async ({ searchInfor, captcha }, thunkAPI) => {
    try {
      const response = await axiosClient.post("bookings/tickets", {
        tel: searchInfor.tel,
        bookingCode: searchInfor.booking_code,
        capchaToken: captcha,
      });
      return response;
    } catch (error) {
      let message = "";
      if (error.response) {
        if (error.response.status === 400) {
          message = "Vui lòng xác minh mã CAPTCHA";
        } else if (error.response.status === 404) {
          message = "Không tìm thấy thông tin";
        } else {
          message =
            "Không tìm thấy thông tin" ||
            (error.response.data && error.response.data.message)
              ? error.response.data.message
              : error.message;
        }
      } else {
        message =
          "Không tìm thấy thông tin" || error.message || error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const bookingPayment = createAsyncThunk(
  "tickets/payment",
  async (
    { bookingCode, payment, transactionNo, transactionDate },
    thunkAPI,
  ) => {
    try {
      const response = await axiosClient.put("tickets/payment", {
        bookingCode: bookingCode,
        paymentMethod: payment,
        transactionNo: transactionNo,
        transactionDate: transactionDate,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const cancelPayment = createAsyncThunk(
  "bookings/cancel",
  async (bookingCode, thunkAPI) => {
    try {
      const response = await axiosClient.put("bookings/cancel", null, {
        params: {
          bookingCode: bookingCode,
        },
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const getUserHistory = createAsyncThunk(
  "bookings/booking-history",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get("bookings/booking-history");
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const keepPayment = createAsyncThunk(
  "bookings/keep-booking",
  async (bookingCode, thunkAPI) => {
    try {
      const response = await axiosClient.post("bookings/keep-booking", null, {
        params: {
          bookingCode: bookingCode,
        },
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const bookingReturn = createAsyncThunk(
  "bookings/return",
  async ({bookingGo, bookingReturn, userInfo}, thunkAPI) => {
    try {
      const response = await axiosClient.post("/bookings/booking-return-ticket", {
          ticketNumber: bookingGo.bookedSeat.length,
          name: userInfo.name,
          email: userInfo.email,
          tel: userInfo.tel,
          tripId: bookingGo.bookingTrip.tripInfor.id,
          scheduleId: bookingGo.bookingTrip.id,
          pickStationId: bookingGo.pickPoint,
          dropStationId: bookingGo.dropPoint,
          seatName: bookingGo.bookedSeat,
          ticketNumberReturn: bookingReturn.bookedSeat.length,
          tripReturnId:  bookingReturn.bookingTrip.tripInfor.id,
          scheduleReturnId: bookingReturn.bookingTrip.id,
          pickStationReturnId: bookingReturn.pickPoint,
          dropStationReturnId: bookingReturn.dropPoint,
          seatNameReturn: bookingReturn.bookedSeat,      
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const bookingReturnPayment = createAsyncThunk(
  "tickets/return/payment",
  async (
    { bookingCode, bookingCodeReturn, payment, transactionNo, transactionDate },
    thunkAPI,
  ) => {
    try {
      const response = await axiosClient.put("tickets/payments", {
          bookingCode: bookingCode,
          bookingCodeReturn: bookingCodeReturn,
          paymentMethod: payment,
          transactionNo: transactionNo,
          transactionDate: transactionDate,
      });
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const bookingThunk = {
  bookingForGuest,
  bookingForUser,
  getBookingInfor,
  bookingPayment,
  cancelPayment,
  getUserHistory,
  keepPayment,
  bookingReturn,
  bookingReturnPayment,
};

export default bookingThunk;
