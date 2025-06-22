import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST } from "../constants/api";

export const modelsApi = createApi({
  reducerPath: "modelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/carcard/v1`,
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
