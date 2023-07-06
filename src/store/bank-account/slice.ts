import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import toast from "react-hot-toast";
import { baseQuery } from "../api";
import {
  setLoading,
  setStripeAccount,
  setStripeBankAccount,
} from "../application/slice";
import { GenericApiError } from "../store.model";
import {
  AddBankAccountRequest,
  BankAccount,
  BankAccountResponse,
} from "./bank-account.model";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { createBankAccountErrorsHandler } from "./errors/create";
import { deleteBankAccountErrorsHandler } from "./errors/delete";
import { getBankAccountErrorsHandler } from "./errors/get";

export const bankAccountApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Add bank account
    createBankAccount: builder.mutation<
      BankAccountResponse,
      AddBankAccountRequest
    >({
      query: (bankAccount) => ({
        url: `${endpoint.bankAccount}`,
        method: "POST",
        body: bankAccount,
      }),
      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setBankAccount(data));
          // @ts-ignore
          dispatch(setStripeAccount(data));
          // @ts-ignore
          dispatch(setStripeBankAccount(data));
          toast.success("🏦 Votre compte bancaire à été ajouté avec succès !");
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          createBankAccountErrorsHandler(error);
        }
      },
    }),

    // Delete bank account
    deleteBankAccount: builder.mutation<BankAccountResponse, void>({
      query: () => ({
        url: `${endpoint.bankAccount}`,
        method: "DELETE",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setBankAccount(data));
          // @ts-ignore
          dispatch(setStripeBankAccount(null));
          toast.success(
            "🏦 Votre compte bancaire à été supprimé avec succès !"
          );
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          deleteBankAccountErrorsHandler(error);
        }
      },
    }),

    // Get bank account
    getBankAccount: builder.query<BankAccountResponse, void>({
      query: () => ({
        url: `${endpoint.bankAccount}`,
        method: "GET",
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;

          dispatch(setLoading(false));
          dispatch(setBankAccount(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getBankAccountErrorsHandler(error);
          error.error.status === 404 && dispatch(setBankAccount(initialState));
        }
      },
    }),
  }),
});

export const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState,
  reducers: {
    setBankAccount: (state, action: PayloadAction<BankAccount>) => {
      state.id = action.payload.id;
      state.bank_account_id = action.payload.bank_account_id;
      state.fk_stripe_account = action.payload.fk_stripe_account;
      state.country = action.payload.country;
      state.last4 = action.payload.last4;
      state.fringerprint = action.payload.fringerprint;
    },
  },
});

export const { setBankAccount } = bankAccountSlice.actions;

export const {
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useGetBankAccountQuery,
} = bankAccountApi;
