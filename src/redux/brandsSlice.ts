import { createSlice } from "@reduxjs/toolkit";
import { brandsApi } from "./brandsApi";

const BrandsSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(brandsApi.endpoints.getBrands.matchPending, (state) => {
        state.isLoading = true;
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
          state.error = action.error.message;
        }
      );
  },
});

export default BrandsSlice.reducer;
