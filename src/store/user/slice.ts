import { createApi } from "@reduxjs/toolkit/query/react";
import { reducerPath, CACHE_KEY, initialState } from "./constants";
import { baseQuery } from "../api";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "src/model/user.schema";
import { endpoints } from "./constants";
import { GenericApiError } from "../store.model";
import { setLoading } from "../application/slice";
import { endpoint } from "../application/constants";
import toast from "react-hot-toast";
import { askResetPasswordErrorsHandler } from "../application/errors/ask-reset.error";

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
    updateEmail: builder.mutation<
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

    // Confirm account
    confirmAccount: builder.mutation<
      { confirm: boolean },
      { email_token: string }
    >({
      query: (body) => ({
        url: endpoints.confirmAccount,
        method: "POST",
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

    // Ask reset password
    askResetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: `${endpoint.askResetPassword}`,
        method: "POST",
        body: { email },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
          toast.success("📨 Mail envoyé !");
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          askResetPasswordErrorsHandler(error);
        }
      },
    }),

    // Ask reset password
    resetPassword: builder.mutation<
      User,
      { email_token: string; password: string }
    >({
      query: (body) => ({
        url: `${endpoints.resetPassword}`,
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          toast.success("🔑 Mot de passe modifié !");
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

export const {
  useUpdateMutation,
  useGetQuery,
  useGetAllQuery,
  useDeleteMutation,
  useUpdatePasswordMutation,
  useConfirmAccountMutation,
  useAskResetPasswordMutation,
  useResetPasswordMutation,
  useUpdateEmailMutation,
} = userApi;

export const {} = userSlice.actions;
