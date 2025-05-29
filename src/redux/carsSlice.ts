import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cars } from "../utils/cars";
import { CarCardType } from "../types";

type FilterState = {
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  carCategory?: string;
  carBodyType?: string;
  hasAirConditioning?: boolean;
  hasChildSeat?: boolean;
  allowedForTaxi?: boolean;
  allowedOnlyForPersonalUse?: boolean;
  buyoutPossible?: boolean;
};

export const fetchCars = createAsyncThunk<CarCardType[]>(
  "cars/fetchCars",
  async () => {
    return new Promise<CarCardType[]>((resolve) => {
      setTimeout(() => {
        const typedCars = cars.map((car) => ({
          ...car,
          listing: {
            ...car.listing,
            size: car.listing.size as "large" | undefined,
          },
        })) as CarCardType[];
        resolve(typedCars);
      }, 500);
    });
  }
);

export const fetchCarById = createAsyncThunk<CarCardType, string>(
  "cars/fetchCarById",
  async (id) => {
    return new Promise<CarCardType>((resolve, reject) => {
      setTimeout(() => {
        const foundCar = cars.find((car) => car.listing.id === id);
        if (foundCar) {
          const typedCar = {
            ...foundCar,
            listing: {
              ...foundCar.listing,
              size: foundCar.listing.size as "large" | undefined,
            },
          } as CarCardType;
          resolve(typedCar);
        } else {
          reject(new Error("Car not found"));
        }
      }, 500);
    });
  }
);

interface CarsState {
  cars: CarCardType[];
  car: CarCardType | null;
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [],
  car: null,
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    filterCars: (state, action: { payload: FilterState }) => {
      const filters = action.payload;

      const typedCars = cars.map((car) => ({
        ...car,
        listing: {
          ...car.listing,
          size: car.listing.size as "large" | undefined,
        },
      })) as CarCardType[];

      state.cars = typedCars.filter((car) => {
        const { carRentListing } = car.listing;
        if (!carRentListing) {
          return false;
        }

        const { carContent, listingOptions } = carRentListing;

        // Фильтр по городу
        if (
          filters.city &&
          !carRentListing.city
            .toLowerCase()
            .includes(filters.city.toLowerCase())
        ) {
          return false;
        }

        if (filters.minPrice && carRentListing.pricePerDay < filters.minPrice) {
          return false;
        }

        if (filters.maxPrice && carRentListing.pricePerDay > filters.maxPrice) {
          return false;
        }

        if (
          filters.startDate &&
          new Date(carContent.createdAt) > new Date(filters.startDate)
        ) {
          return false;
        }

        if (
          filters.endDate &&
          new Date(carContent.createdAt) < new Date(filters.endDate)
        ) {
          return false;
        }

        if (
          filters.carCategory &&
          carContent.carCategory !== filters.carCategory
        ) {
          return false;
        }

        if (
          filters.carBodyType &&
          carContent.carBodyType !== filters.carBodyType
        ) {
          return false;
        }

        if (
          filters.hasAirConditioning &&
          !carContent.carOptions.hasAirConditioning
        ) {
          return false;
        }

        if (filters.hasChildSeat && !carContent.carOptions.hasChildSeat) {
          return false;
        }

        if (filters.allowedForTaxi && !listingOptions.allowedForTaxi) {
          return false;
        }

        if (
          filters.allowedOnlyForPersonalUse &&
          !listingOptions.allowedOnlyForPersonalUse
        ) {
          return false;
        }

        if (filters.buyoutPossible && !listingOptions.buyoutPossible) {
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
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cars";
      })
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch car";
      });
  },
});

export const { filterCars } = carsSlice.actions;
export default carsSlice.reducer;
