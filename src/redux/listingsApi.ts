import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listingsApi = createApi({
  reducerPath: "listingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://87.228.81.144/listing/v1/listings",
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
