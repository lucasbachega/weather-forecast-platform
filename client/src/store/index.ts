import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Tipagem dos hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
