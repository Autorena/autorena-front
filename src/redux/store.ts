import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice";
import loaderReducer from "./loaderSlice";
import userReduser from "./userSlice";
import brandsReducer from "./brandsSlice";
import { brandsApi } from "./brandsApi";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    loader: loaderReducer,
    user: userReduser,
    brands: brandsReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brandsApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
