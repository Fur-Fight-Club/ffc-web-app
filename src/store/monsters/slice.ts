import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { toast } from "react-hot-toast";
import { baseQuery } from "../api";
import {
  removeMonster,
  setLoading,
  setMonsters as setMyMonsters,
  updateMonster,
} from "../application/slice";
import { GenericApiError } from "../store.model";
import { endpoint, initialState, reducerPath } from "./constants";
import { createMonsterErrorsHandler } from "./errors/create";
import { deleteMonstersHandler } from "./errors/delete";
import { getMonstersHandler } from "./errors/get";
import { updateMonstersHandler } from "./errors/update";
import { Monster } from "./monsters.model";

export const monstersApi = createApi({
  reducerPath,
  baseQuery,
  endpoints: (builder) => ({
    // Get monsters
    getMonsters: builder.query<Monster[], void>({
      query: () => ({
        url: endpoint.get,
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;

          dispatch(setLoading(false));
          dispatch(setMonsters(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getMonstersHandler(error);
        }
      },
    }),

    // Get all monsters
    getAllMonsters: builder.query<Monster[], void>({
      query: () => ({
        url: endpoint.getAll,
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getMonstersHandler(error);
        }
      },
    }),

    // Get all monsters for one user
    getAllMonsterFromOneUser: builder.query<Monster[], number>({
      query: (id) => ({
        url: endpoint.getAllFromOneUser(id),
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getMonstersHandler(error);
        }
      },
    }),

    // Get monster by id
    getMonsterById: builder.query<Monster, number>({
      query: (id) => ({
        url: endpoint.getOne(id),
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getMonstersHandler(error);
        }
      },
    }),

    // Create monster
    createMonster: builder.mutation<
      Monster,
      Pick<
        Monster,
        | "name"
        | "weight"
        | "fk_user"
        | "weight_category"
        | "monster_type"
        | "picture"
      >
    >({
      query: (monster) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: monster,
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setMyMonsters(data));
          toast.success("Le monstre a bien été créé.");
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          createMonsterErrorsHandler(error);
        }
      },
    }),

    // Patch monster
    updateMonster: builder.mutation<
      Monster,
      Pick<
        Monster,
        "name" | "weight" | "id" | "weight_category" | "monster_type"
      > & { id: number }
    >({
      query: (monster) => ({
        url: endpoint.patch(monster.id),
        method: "PATCH",
        body: monster,
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        toast.success("Le monstre a bien été modifié.");
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(updateMonster(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          updateMonstersHandler(error);
        }
      },
    }),

    // Delete monster
    deleteMonster: builder.mutation<Monster, number>({
      query: (monsterId) => ({
        url: endpoint.delete(monsterId),
        method: "DELETE",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(removeMonster(resource));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          deleteMonstersHandler(error);
        }
      },
    }),
  }),
});

export const monstersSlice = createSlice({
  name: "monster",
  initialState,
  reducers: {
    setMonsters: (state, action: PayloadAction<Monster[]>) => {
      state = action.payload;
    },
  },
});

export const {
  useGetMonstersQuery,
  useGetMonsterByIdQuery,
  useCreateMonsterMutation,
  useUpdateMonsterMutation,
  useDeleteMonsterMutation,
  useGetAllMonstersQuery,
  useGetAllMonsterFromOneUserQuery,
} = monstersApi;

export const { setMonsters } = monstersSlice.actions;
