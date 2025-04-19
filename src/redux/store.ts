// store.ts
import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice";
import loaderReducer from "./loaderSlice";
import userReduser from "./userSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    loader: loaderReducer,
    user: userReduser,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
