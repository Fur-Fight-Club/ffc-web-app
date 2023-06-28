import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { CACHE_KEY, endpoints, initialState, reducerPath } from "./constants";
import { baseQuery } from "../api";
import { Callback } from "./payments.model";
import { toast } from "react-hot-toast";
import { GenericApiError } from "../store.model";
import { createSlice } from "@reduxjs/toolkit";

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
  }),
});

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
});

export const {} = paymentsSlice.actions;

export const { usePaymentsCallbackMutation } = paymentsApi;
