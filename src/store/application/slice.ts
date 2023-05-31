import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { GenericApiError } from '../store.model';
import { baseQuery } from './../api';

import {
  DeleteNotificationTokenRequest,
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequest,
  UpdateRequest,
  UpdateResponse,
  UpdateTokenActiveStateRequest,
  UpsertNotificationTokenRequest,
  UpsertNotificationTokenResponse,
  User,
} from './application.model';
import { CACHE_KEY, endpoint, initialState, reducerPath } from './constants';
import { askResetPasswordErrorsHandler } from './errors/ask-reset.error';
import { loginErrorsHandler } from './errors/login.error';
import { registerErrorsHandler } from './errors/register.error';

export const applicationApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (user) => ({
        url: `${endpoint.login}`,
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setToken(data.access_token));
          toast.success('👋 Bienvenue !');
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          loginErrorsHandler(error);
        }
      },
    }),

    // Register
    register: builder.mutation<User, RegisterRequest>({
      query: (user) => ({
        url: `${endpoint.register}`,
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setUser(data));
          toast.success('Bienvenue sur Fury Fight Club !');
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          registerErrorsHandler(error);
        }
      },
    }),

    // Ask reset password
    askResetPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: `${endpoint.askResetPassword}`,
        method: 'POST',
        body: { email },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
          toast.success('📨 Mail envoyé !');
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          askResetPasswordErrorsHandler(error);
        }
      },
    }),

    // User's informations route
    getUser: builder.query<MeResponse, void>({
      query: () => ({
        url: `${endpoint.me}`,
        method: 'GET',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setUserInformation(data));
        } catch (err) {
          const error = err as GenericApiError;
          console.log(error.error.data);

          dispatch(setLoading(false));
          toast.error('🚨 Une erreur est survenue, veuillez réessayer');
        }
      },
    }),

    // Upsert notification token
    upsertNotificationToken: builder.mutation<
      UpsertNotificationTokenResponse,
      UpsertNotificationTokenRequest
    >({
      query: (body) => ({
        url: `${endpoint.notificationToken}`,
        method: 'POST',
        body,
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setNotificationToken(data.token));
        } catch (err) {
          const error = err as GenericApiError;
          console.log(error);

          dispatch(setLoading(false));
          toast.error('🚨 Une erreur est survenue, veuillez réessayer');
        }
      },
    }),

    // Delete notification token
    deleteNotificationToken: builder.mutation<
      UpsertNotificationTokenResponse,
      DeleteNotificationTokenRequest
    >({
      query: (body) => ({
        url: `${endpoint.notificationToken}`,
        method: 'DELETE',
        body,
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setNotificationToken(null));
        } catch (err) {
          const error = err as GenericApiError;
          console.log(error);
          dispatch(setLoading(false));
          dispatch(setNotificationToken(null));
        }
      },
    }),

    // Update token active state
    updateTokenActiveState: builder.mutation<
      UpsertNotificationTokenResponse,
      UpdateTokenActiveStateRequest
    >({
      query: (body) => ({
        url: `${endpoint.notificationTokenActive}`,
        method: 'PATCH',
        body,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
          // Toast.show({
          //   type: 'success',
          //   text1: '📳 Notification !',
          //   text2: `Vous avez bien ${
          //     body.active ? 'activé' : 'désactivé'
          //   } les notifications`,
          // });
          toast.success('📳 Notification !');
        } catch (err) {
          const error = err as GenericApiError;
          console.log(error);
          dispatch(setLoading(false));
          toast.error(
            '🚨 Erreur lors de la mise à jour de vos paramètres , veuillez réssayer'
          );
        }
      },
    }),

    // update user
    UpdateUser: builder.mutation<UpdateResponse, UpdateRequest>({
      query: (user) => ({
        url: `${endpoint.update}`,
        method: 'PATCH',
        body: user,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          // update state user with new data
          dispatch(setUpdateUser(data));
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          toast.error('🚨 Une erreur est survenue, veuillez réessayer');
        }
      },
    }),
  }),
});

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNotificationToken: (state, action: PayloadAction<string | null>) => {
      state.notification_token = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserInformation: (state, action: PayloadAction<MeResponse>) => {
      state.user = {
        ...action.payload.user,
        Invoice: action.payload.invoices,
        MatchMessage: [],
        Monster: [],
        StripeAccount: action.payload.stripeAccount,
        Wallet: action.payload.wallet[0],
        transaction: action.payload.transaction,
      };
    },
    setUpdateUser: (
      state,
      action: PayloadAction<{ firstname: string; lastname: string }>
    ) => {
      const { firstname, lastname } = action.payload;
      firstname && (state.user.firstname = firstname);
      lastname && (state.user.lastname = lastname);
    },
  },
});

export const {
  setUser,
  setLoading,
  setNotificationToken,
  setToken,
  setUserInformation,
  setUpdateUser,
} = applicationSlice.actions;

export const {
  useLoginMutation,
  useRegisterMutation,
  useAskResetPasswordMutation,
  useGetUserQuery,
  useUpsertNotificationTokenMutation,
  useDeleteNotificationTokenMutation,
  useUpdateUserMutation,
} = applicationApi;
