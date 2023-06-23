import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../api";
import { setLoading } from "../application/slice";
import { GenericApiError } from "../store.model";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";

import { Arenas } from "./arenas.model";

export const ArenaApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Get Arenas
    getArenas: builder.query<Arenas[], void>({
      query: () => ({
        url: `${endpoint.get}`,
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setArenas(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          // getArenasErrorsHandler(error);
        }
      },
    }),

    // Create Arena
    createArena: builder.mutation({
      query: (arena) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: arena,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          // createArenaSuccessHandler(data);
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          // createArenaErrorsHandler(error);
        }
      },
    }),
  }),
});

export const arenaSlice = createSlice({
  name: "arena",
  initialState,
  reducers: {
    setArenas: (state, action) => {
      state.arenas = action.payload;
    },
  },
});

export const { setArenas } = arenaSlice.actions;

export const { useGetArenasQuery, useCreateArenaMutation } = ArenaApi;
