import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import createOrJoinReducer from "../features/createOrJoinSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    createorjoin: createOrJoinReducer,
  },
});
