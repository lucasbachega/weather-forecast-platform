import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import weatherReducer from "./reducers/weatherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
});

// Tipagem dos hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
