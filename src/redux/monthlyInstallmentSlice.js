import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const monthlyInstallmentSlice = createSlice({
  name: "monthlyInstallment",
  initialState: {
    month: moment().month() + 1,
    year: moment().year(),
  },
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { setMonth, setYear } = monthlyInstallmentSlice.actions;

export default monthlyInstallmentSlice.reducer;
