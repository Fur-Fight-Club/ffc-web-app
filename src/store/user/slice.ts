import { createApi } from "@reduxjs/toolkit/query/react";
import { reducerPath, CACHE_KEY, initialState } from "./constants";
import { baseQuery } from "../api";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/model/user.schema";
import { endpoints } from "./constants";
import { GenericApiError } from "../store.model";
import { setLoading } from "../application/slice";

export const userApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Update user
    update: builder.mutation<User, Partial<User>>({
      query: ({ id, ...body }) => ({
        url: endpoints.update(id!),
        method: "PATCH",
        body,
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          console.log(error.error.data);
        }
      },
    }),

    // Get user
    get: builder.query<User, number>({
      query: (id) => ({
        url: endpoints.get(id),
        method: "GET",
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          console.log(error.error.data);
        }
      },
    }),

    // Get all users
    getAll: builder.query<User[], void>({
      query: () => ({
        url: endpoints.getAll,
        method: "GET",
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          console.log(error.error.data);
        }
      },
    }),

    // Delete user
    delete: builder.mutation<User, number>({
      query: (id) => ({
        url: endpoints.delete(id),
        method: "DELETE",
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          console.log(error.error.data);
        }
      },
    }),

    // Update user password
    updatePassword: builder.mutation<
      User,
      { id: number; oldPassword: string; password: string }
    >({
      query: (body) => ({
        url: endpoints.updatePassword(body.id),
        method: "PATCH",
        body,
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          console.log(error.error.data);
        }
      },
    }),

    // Update user email
    PaymentRequestUpdateEvent: builder.mutation<
      User,
      { id: number; email: string; oldEmail: string }
    >({
      query: (body) => ({
        url: endpoints.updateEmail(body.id),
        method: "PATCH",
        body,
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          console.log(error.error.data);
        }
      },
    }),
  }),
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userApi;

export const {} = userSlice.actions;
