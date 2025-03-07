
import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "./storesSlice";

export const store = configureStore({
  reducer: {
    stores: storesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;