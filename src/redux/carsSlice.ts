import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cars } from "../utils/cars";
import { CarCardType } from "../types";

export const fetchCars = createAsyncThunk<CarCardType[]>(
  "cars/fetchCars",
  async () => {
    return new Promise<CarCardType[]>((resolve) => {
      setTimeout(() => {
        resolve(cars);
      }, 500);
    });
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [] as CarCardType[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default carsSlice.reducer;
