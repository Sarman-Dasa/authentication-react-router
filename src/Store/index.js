import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./App/index";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

export default store;
