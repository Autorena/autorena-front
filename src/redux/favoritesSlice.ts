import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarCardType } from "../types";

type FavoritesState = {
  items: CarCardType[];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  } as FavoritesState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<CarCardType>) => {
      const item = action.payload;
      const exists = state.items.find((favorite) => favorite.id === item.id);

      if (!exists) {
        state.items.push(item);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    setFavorites: (state, action: PayloadAction<CarCardType[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  setFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
