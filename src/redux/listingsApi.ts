import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../constants/api";

export const listingsApi = createApi({
  reducerPath: "listingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/listing/v1/listings`,
  }),
  endpoints: (builder) => ({
    filterListings: builder.query({
      query: (body) => ({
        url: "/find",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFilterListingsQuery, useLazyFilterListingsQuery } =
  listingsApi;
