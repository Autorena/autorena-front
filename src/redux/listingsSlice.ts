import { createSlice } from "@reduxjs/toolkit";

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    filteredListings: [],
    isFilterApplied: false,
    filterError: null,
  },
  reducers: {
    setFilteredCars: (state, action) => {
      state.filteredListings = action.payload;
      state.isFilterApplied = true;
      state.filterError = null;
    },
    resetFilter: (state) => {
      state.filteredListings = [];
      state.isFilterApplied = false;
      state.filterError = null;
    },
    setFilterError: (state, action) => {
      state.filterError = action.payload;
    },
  },
});

export const { setFilteredCars, resetFilter, setFilterError } =
  listingsSlice.actions;
export default listingsSlice.reducer;
