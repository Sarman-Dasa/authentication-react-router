import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    isloggedin: false,
    isFullLayout: false,
  },

  reducers: {
    setLoginUser(state, action) {
      state.user = action.payload;
      state.isloggedin = true;
    },

    userLogout(state) {
      state.isloggedin = false;
    },

    updateLayout(state, action) {
      state.isFullLayout = action.payload;
    },
  },
});

export const { setLoginUser, userLogout, updateLayout } = appSlice.actions;

export default appSlice.reducer;
