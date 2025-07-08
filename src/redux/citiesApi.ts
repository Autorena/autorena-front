import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../constants/api";

export type City = {
  id: number;
  name: string;
  population: number;
  lat: number;
  lon: number;
  regionId: number;
  okato: string;
  oktmo: string;
  kladrId: string;
  fiasId: string;
  placeId: string;
};

export const citiesApi = createApi({
  reducerPath: "citiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/api/geo/v1`,
  }),
  endpoints: (builder) => ({
    getCities: builder.query({
      query: () => {
        console.log("Fetching cities from:", `${API_HOST}/api/geo/v1/towns`);
        return "/towns";
      },
    }),
    getNearestCity: builder.query({
      query: ({ lat, lon }) => `/towns/nearest?lat=${lat}&lon=${lon}`,
    }),
  }),
});

export const { useGetCitiesQuery, useGetNearestCityQuery } = citiesApi;
