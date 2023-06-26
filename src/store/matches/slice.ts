import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Match, PlaceBet } from "./matches.model";
import { getMatchesErrorHandler } from "./errors/get";
import { placeBetErrorHandler } from "./errors/placeBet";
import { MatchMessage, Transaction } from "ffc-prisma-package/dist/client";
import { baseQuery } from "../api";
import { Toast, toast } from "react-hot-toast";
import { GenericApiError } from "../store.model";

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

export const { setMatches } = matchesSlice.actions;

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
