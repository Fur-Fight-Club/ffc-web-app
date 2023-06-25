import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../api";
import { setLoading } from "../application/slice";
import { GenericApiError } from "../store.model";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";

import { toast } from "react-hot-toast";
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
          dispatch(updateArena(data));
          toast.success("L'arène a bien été créée !");
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          toast.error("Une erreur est survenue lors de la création de l'arène");
        }
      },
    }),

    // Delete Arena
    deleteArena: builder.mutation({
      query: (id) => ({
        url: `${endpoint.delete}` + id,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(deleteArena(data));
          toast.success("L'arène a bien été supprimée !");
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          toast.error(
            "Une erreur est survenue lors de la suppression de l'arène"
          );
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
    updateArena: (state, action) => {
      state.arenas.push(action.payload);
    },
    deleteArena: (state, action) => {
      state.arenas = state.arenas.filter(
        (arena) => arena.id !== action.payload
      );
    },
  },
});

export const { setArenas, updateArena, deleteArena } = arenaSlice.actions;

export const {
  useGetArenasQuery,
  useCreateArenaMutation,
  useDeleteArenaMutation,
} = ArenaApi;
