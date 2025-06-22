import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../constants/api";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/carcard/v1`,
  }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "/brands",
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApi;
