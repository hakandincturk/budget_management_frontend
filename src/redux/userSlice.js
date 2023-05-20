import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || false,
    roles: []
  },
  reducers: {
    login: (state, action) => {
      console.log('action.payload -->', action.payload);
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.roles = []
      state.user = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
