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

export const fetchCarById = createAsyncThunk<CarCardType, string>(
  "cars/fetchCarById",
  async (id) => {
    return new Promise<CarCardType>((resolve, reject) => {
      setTimeout(() => {
        const foundCar = cars.find((car) => car.common.id === id);
        if (foundCar) {
          resolve(foundCar);
        } else {
          reject(new Error("Car not found"));
        }
      }, 500);
    });
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [] as CarCardType[],
    car: {} as CarCardType,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    filterCars: (state, action) => {
      const filters = action.payload;

      state.cars = cars.filter((car) => {
        if (
          filters.city &&
          !car.common.city.toLowerCase().includes(filters.city.toLowerCase())
        ) {
          return false;
        }

        if (
          filters.district &&
          !car.common.district
            .toLowerCase()
            .includes(filters.district.toLowerCase())
        ) {
          return false;
        }

        if (
          filters.min_price &&
          car.rent_auto.cost_per_day < Number(filters.min_price)
        ) {
          return false;
        }

        if (
          filters.max_price &&
          car.rent_auto.cost_per_day > Number(filters.max_price)
        ) {
          return false;
        }

        if (
          filters.start_date &&
          new Date(car.common.created_at) > new Date(filters.start_date)
        ) {
          return false;
        }

        if (
          filters.end_date &&
          new Date(car.common.created_at) < new Date(filters.end_date)
        ) {
          return false;
        }

        if (filters.can_be_delivered && !car.daily_rent.delivery_possible) {
          return false;
        }

        return true;
      });
    },
  },
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
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      });
  },
});

export const { filterCars } = carsSlice.actions;
export default carsSlice.reducer;
