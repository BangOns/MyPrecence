import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./feature/getUserSlice";

export const store = configureStore({
  reducer: {
    users: UserSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
