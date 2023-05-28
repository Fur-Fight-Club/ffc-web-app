import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "@store/api";
import { GenericApiError } from "@store/store.model";
import Toast from "react-native-toast-message";

export const matchesApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({}),
});

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
});

export const {} = matchesSlice.actions;

export const {} = matchesApi;
