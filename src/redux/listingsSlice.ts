import { createSlice } from "@reduxjs/toolkit";

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    filteredListings: [],
    isFilterApplied: false,
  },
  reducers: {
    setFilteredCars: (state, action) => {
      state.filteredListings = action.payload;
      state.isFilterApplied = true;
    },
    resetFilter: (state) => {
      state.filteredListings = [];
      state.isFilterApplied = false;
    },
  },
});

export const { setFilteredCars, resetFilter } = listingsSlice.actions;
export default listingsSlice.reducer;
