import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://87.228.81.144/carcard/v1",
  }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "/brands",
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApi;
