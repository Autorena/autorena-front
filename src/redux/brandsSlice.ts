import { createSlice } from "@reduxjs/toolkit";
import { brandsApi } from "./brandsApi";

type Brand = {
  id: string;
  name: string;
};

type BrandsState = {
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
};

const initialState: BrandsState = {
  brands: [],
  isLoading: false,
  error: null,
};

const BrandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(brandsApi.endpoints.getBrands.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        brandsApi.endpoints.getBrands.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.brands = action.payload;
        }
      )
      .addMatcher(
        brandsApi.endpoints.getBrands.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "Unknown error";
        }
      );
  },
});

export default BrandsSlice.reducer;
