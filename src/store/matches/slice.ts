import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  Arena,
  MatchMessage,
  Monster,
  Transaction,
} from "ffc-prisma-package/dist/client";
import { toast } from "react-hot-toast";
import { baseQuery } from "../api";
import { GenericApiError } from "../store.model";
import {
  CACHE_KEY,
  createMatchFormInitialState,
  endpoint,
  initialState,
  reducerPath,
} from "./constants";
import { getMatchesErrorHandler } from "./errors/get";
import { placeBetErrorHandler } from "./errors/placeBet";
import { Match, PlaceBet } from "./matches.model";

export const matchesApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Get all matches
    getMatches: builder.query<Match[], void>({
      query: () => ({
        url: `${endpoint.getAll}`,
        method: "GET",
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(matchesSlice.actions.setMatches(response.data));
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Get one match
    getMatch: builder.query<Match, number>({
      query: (id) => ({
        url: `${endpoint.getOne(id)}`,
        method: "GET",
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Create a match
    createMatch: builder.mutation<Match, Match>({
      query: ({ id, ...body }) => ({
        url: `${endpoint.createMatch}`,
        method: "POST",
        body,
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Join a match
    joinMatch: builder.mutation<Match, { matchId: number; monsterId: number }>({
      query: ({ matchId, monsterId }) => ({
        url: `${endpoint.joinMatch(matchId)}/join`,
        method: "PATCH",
        body: { monster: monsterId },
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Validate join request
    validateJoinRequest: builder.mutation<
      Match,
      { matchId: number; monsterId: number }
    >({
      query: ({ matchId, monsterId }) => ({
        url: `${endpoint.joinMatchValidate(matchId)}`,
        method: "PATCH",
        body: { monster: monsterId },
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Reject join request
    rejectJoinRequest: builder.mutation<
      Match,
      { matchId: number; monsterId: number }
    >({
      query: ({ matchId, monsterId }) => ({
        url: `${endpoint.joinMatchReject(matchId)}`,
        method: "PATCH",
        body: { monster: monsterId },
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Close a match
    closeMatch: builder.mutation<Match, number>({
      query: (id) => ({
        url: `${endpoint.closeMatch(id)}`,
        method: "PATCH",
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Delete a match
    deleteMatch: builder.mutation<Match, number>({
      query: (id) => ({
        url: `${endpoint.deleteMatch(id)}`,
        method: "DELETE",
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Send message
    sendMessage: builder.mutation<
      MatchMessage,
      { id: number; message: string }
    >({
      query: ({ id, message }) => ({
        url: `${endpoint.sendMessage(id)}`,
        method: "POST",
        body: { message },
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          getMatchesErrorHandler(error);
        }
      },
    }),

    // Place a bet
    placeBet: builder.mutation<Transaction, PlaceBet>({
      query: ({ matchId, ...body }) => ({
        url: `${endpoint.placeBet(matchId)}`,
        method: "POST",
        body,
      }),

      onQueryStarted: async (resource, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          toast.success("Votre pari a bien été placé !");
        } catch (err) {
          const error = err as GenericApiError;
          placeBetErrorHandler(error);
        }
      },
    }),
  }),
});

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
  },
});

export const createMatchFormSlice = createSlice({
  name: "createMatchForm",
  initialState: createMatchFormInitialState,
  reducers: {
    setStepCreateForm: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setMonsterCreateForm: (state, action: PayloadAction<Monster>) => {
      state.monster = action.payload;
    },
    setArenaCreateForm: (state, action: PayloadAction<Arena>) => {
      state.arena = action.payload;
    },
    setBetCreateForm: (state, action: PayloadAction<number>) => {
      state.bet = action.payload;
    },
    resetCreateForm: (state) => {
      state.step = 0;
      state.monster = null;
      state.arena = null;
      state.bet = 0;
    },
  },
});

export const { setMatches } = matchesSlice.actions;

export const {
  setStepCreateForm,
  setMonsterCreateForm,
  setArenaCreateForm,
  setBetCreateForm,
  resetCreateForm,
} = createMatchFormSlice.actions;

export const {
  useGetMatchQuery,
  useGetMatchesQuery,
  useSendMessageMutation,
  usePlaceBetMutation,
  useCreateMatchMutation,
  useJoinMatchMutation,
  useValidateJoinRequestMutation,
  useRejectJoinRequestMutation,
  useCloseMatchMutation,
  useDeleteMatchMutation,
} = matchesApi;
