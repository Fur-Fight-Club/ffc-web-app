import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { toast } from "react-hot-toast";
import { baseQuery } from "../api";
import { setLoading } from "../application/slice";
import { GenericApiError } from "../store.model";
import { CACHE_KEY, endpoints, initialState, reducerPath } from "./constants";
import { Callback } from "./payments.model";

export const paymentsApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    paymentsCallback: builder.mutation<
      any,
      { callback: Callback; session_id: string }
    >({
      query: ({ callback, session_id }) => ({
        url: endpoints.paymentsCallback(callback, session_id),
        method: "POST",
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          toast.success("Votre paiment a bien ete confirme !");
        } catch (err) {
          const error = err as GenericApiError;
          console.log(error.error.data);
          toast.error(
            "Oups une erreur est survenue lors de la confirmation de votre paiement, rafrachissez la page..."
          );
        }
      },
    }),
    // get All payements
    getAllPayement: builder.query<any, void>({
      query: () => ({
        url: endpoints.getAll,
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          dispatch(setLoading(false));
          const { data } = await queryFulfilled;
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
});

export const {} = paymentsSlice.actions;

export const { usePaymentsCallbackMutation, useGetAllPayementQuery } =
  paymentsApi;
