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

const paymentThunk = {
  vnpayPayment,
};

export default paymentThunk;
