import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  register: () => {},
  login: () => {},
  logout: () => {},
  getActiveUser: () => {},
  refreshToken: () => {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    activeUser: null,
  },
  reducers: {
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  register,
  login,
  logout,
  getActiveUser,
  setActiveUser,
  setToken,
  refreshToken,
} = authSlice.actions;
export default authSlice.reducer;
