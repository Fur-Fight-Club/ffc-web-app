import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { reducerPath, CACHE_KEY, endpoints, initialState } from "./constants";
import { baseQuery } from "../api";
import { setLoading } from "../application/slice";
import { GenericApiError } from "../store.model";
import { getTournamentsErrorsHandler } from "./errors/tournaments";
import {
  CreateTournamentDto,
  JoinTournamentDto,
  JoinTournamentResponse,
  Tournament,
  UpdateTournamentDto,
} from "./tournament.model";
import { createSlice } from "@reduxjs/toolkit";

export const tournamentApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Get all tournaments
    getAllTournaments: builder.query<Tournament[], void>({
      query: () => ({
        url: `${endpoints.getAll}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),

    // Get tournament by id
    getTournamentById: builder.query<Tournament, number>({
      query: (id: number) => ({
        url: `${endpoints.get(id)}`,
        method: "GET",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),

    // Create tournament
    createTournament: builder.mutation<Tournament[], CreateTournamentDto>({
      query: (tournament) => ({
        url: `${endpoints.create}`,
        method: "POST",
        body: tournament,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),

    // Update tournament
    updateTournament: builder.mutation<Tournament[], UpdateTournamentDto>({
      query: ({ id, ...tournament }) => ({
        url: `${endpoints.update(id)}`,
        method: "PUT",
        body: tournament,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),

    // Delete tournament
    deleteTournament: builder.mutation<Tournament[], number>({
      query: (id) => ({
        url: `${endpoints.delete(id)}`,
        method: "DELETE",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),

    // Join tournament
    joinTournament: builder.mutation<JoinTournamentResponse, JoinTournamentDto>(
      {
        query: ({ id, monster_id }) => ({
          url: `${endpoints.joinTournament(id)}`,
          method: "POST",
          body: { monster_id },
        }),

        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          dispatch(setLoading(true));
          try {
            const { data } = await queryFulfilled;
            dispatch(setLoading(false));
          } catch (err) {
            const error = err as GenericApiError;
            dispatch(setLoading(false));
            getTournamentsErrorsHandler(error);
          }
        },
      }
    ),

    // Start tournament
    startTournament: builder.mutation<Tournament[], number>({
      query: (id) => ({
        url: `${endpoints.startTournament(id)}`,
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),

    // End round
    endRound: builder.mutation<Tournament[], number>({
      query: (id) => ({
        url: `${endpoints.endRound(id)}`,
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getTournamentsErrorsHandler(error);
        }
      },
    }),
  }),
});

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {},
});

export const tournamentReducer = tournamentSlice.reducer;

export const {
  useGetAllTournamentsQuery,
  useGetTournamentByIdQuery,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useJoinTournamentMutation,
  useStartTournamentMutation,
  useEndRoundMutation,
} = tournamentApi;
