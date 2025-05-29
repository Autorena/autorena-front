import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice";
import loaderReducer from "./loaderSlice";
import userReduser from "./userSlice";
import brandsReducer from "./brandsSlice";
import listingsReducer from "./listingsSlice";
import { brandsApi } from "./brandsApi";
import { modelsApi } from "./modelsApi";
import { listingsApi } from "./listingsApi";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    loader: loaderReducer,
    user: userReduser,
    brands: brandsReducer,
    listings: listingsReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [modelsApi.reducerPath]: modelsApi.reducer,
    [listingsApi.reducerPath]: listingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      brandsApi.middleware,
      modelsApi.middleware,
      listingsApi.middleware
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
