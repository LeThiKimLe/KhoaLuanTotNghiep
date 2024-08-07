import axiosClient from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const vnpayPayment = createAsyncThunk(
  "payment-vnpay",
  async ({ orderId, transDate }, thunkAPI) => {
    try {
      const response = await axiosClient.get("payment/query-payment", {
        params: {
          orderId: orderId,
          transDate: transDate,
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

const createStripePayment = createAsyncThunk(
  "/stripe-create-payment",
  async ({ bookingCode, amount }, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        "bookings/stripe-create-payment",
        {
          token: bookingCode,
          amount: amount,
        },
      );
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

const paymentThunk = {
  vnpayPayment,
  createStripePayment,
};

export default paymentThunk;
