import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cars } from "../utils/cars";
import { CarCardType, CarPageType } from "../types";

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

export const fetchCarById = createAsyncThunk<CarPageType, string>(
  "cars/fetchCarById",
  async (id) => {
    return new Promise<CarPageType>((resolve, reject) => {
      setTimeout(() => {
        const foundCar = cars.find((car) => car.listing.id === id);
        if (foundCar) {
          const typedCar = {
            ...foundCar,
            listing: {
              ...foundCar.listing,
              size: foundCar.listing.size as "large" | undefined,
            },
          } as CarPageType;
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
  cars: cars.map((car) => ({
    id: car.listing.id,
    size: car.listing.size,
    ads: car.listing.ads,
    carRentListing: car.listing.carRentListing,
    carSellListing: undefined,
  })) as CarCardType[],
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
        id: car.listing.id,
        size: car.listing.size,
        ads: car.listing.ads,
        carRentListing: car.listing.carRentListing,
        carSellListing: undefined,
      })) as CarCardType[];

      state.cars = typedCars.filter((car) => {
        const { carRentListing } = car;
        if (!carRentListing) {
          return false;
        }

        const { carContent, listingOptions } = carRentListing;

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
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    resetCar: (state) => {
      state.car = null;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = {
          id: action.payload.listing.id,
          size: action.payload.listing.size,
          ads: action.payload.listing.ads,
          carRentListing: action.payload.listing.carRentListing,
          carSellListing: action.payload.listing.carSellListing || undefined,
        } as CarCardType;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch car";
      });
  },
});

export const { filterCars, resetCar, setCars } = carsSlice.actions;
export default carsSlice.reducer;
