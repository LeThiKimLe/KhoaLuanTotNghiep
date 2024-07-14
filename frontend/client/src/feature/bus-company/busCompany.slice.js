import busCompanyThunk from "./busCompany.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  busCompanyList: [],
};

const busCompanySlice = createSlice({
  name: "busCompany",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      busCompanyThunk.getListBusCompany.fulfilled,
      (state, action) => {
        state.busCompanyList = action.payload;
      },
    );
  },
});

export const selectListCompany = (state) => state.busCompany.busCompanyList;

export const busCompanyActions = busCompanySlice.actions;
export default busCompanySlice.reducer;
