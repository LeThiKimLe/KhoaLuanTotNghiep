import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axios";
const registerBusCompany = createAsyncThunk(
  "/buscompany-register",
  async (companyInfor, thunkAPI) => {
    try {
      const response = await axiosClient.post("partner/register", {
        name: companyInfor.representName,
        email: companyInfor.email,
        tel: companyInfor.telephone,
        gender: true,
        idCard: "",
        address: "",
        beginWorkDate: new Date(),
        businessName: companyInfor.firmName,
        businessLicense: companyInfor.businessLicense,
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

const busCompanyThunk = {
  registerBusCompany,
};

export default busCompanyThunk;
