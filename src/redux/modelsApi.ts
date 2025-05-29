import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modelsApi = createApi({
  reducerPath: "modelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://87.228.81.144/carcard/v1",
  }),
  endpoints: (builder) => ({
    getModels: builder.query({
      query: (body) => ({
        url: "/models",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetModelsQuery } = modelsApi;
