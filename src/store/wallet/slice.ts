import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { toast } from "react-hot-toast";
import { baseQuery } from "../api";
import { setLoading } from "../application/slice";
import { GenericApiError } from "../store.model";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import { buyCreditsErrorsHandler } from "./errors/buy-credits";
import { getBalanceErrorsHandler } from "./errors/get-balance";
import { withdrawErrorsHandler } from "./errors/withdraw";
import {
  BuyCreditsRequest,
  BuyCreditsResponse,
  Wallet,
  WithdrawRequest,
  WithdrawResponse,
} from "./wallet.model";

export const walletApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({
    // Get balance
    getWalletBalance: builder.query<Wallet, void>({
      query: () => ({
        url: `${endpoint.get}`,
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(setWallet(data));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getBalanceErrorsHandler(error);
        }
      },
    }),

    // Withdraw
    withdrawWallet: builder.mutation<WithdrawResponse, WithdrawRequest>({
      query: (withdraw) => ({
        url: `${endpoint.withdraw}`,
        method: "POST",
        body: withdraw,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          toast.success("Votre demande de retrait a bien été prise en compte");
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          withdrawErrorsHandler(error);
        }
      },
    }),

    // Buy credits
    buyCredits: builder.mutation<BuyCreditsResponse, BuyCreditsRequest>({
      query: (buyCredits) => ({
        url: `${endpoint.buyCredits}`,
        method: "POST",
        body: buyCredits,
        headers: {
          "x-request-from": "web",
        },
      }),
      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;

          dispatch(setLoading(false));
          toast.success(
            `Votre demande d'achat de ${resource.credits} crédits (${data.invoice.amount}€) a bien été prise en compte !`
          );
          if (typeof window !== "undefined") {
            window.location.href = data.payment_url;
          }
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          buyCreditsErrorsHandler(error);
        }
      },
    }),

    // Get all wallets
    getAllWallets: builder.query<Wallet[], void>({
      query: () => ({
        url: `${endpoint.getAll}`,
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
          getBalanceErrorsHandler(error);
        }
      },
    }),

    // Set user wallet balance
    setUserWallet: builder.query<Wallet, { userId: number; amount: number }>({
      query: ({ userId, ...body }) => ({
        url: `${endpoint.getUserWallet(userId)}`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          getBalanceErrorsHandler(error);
        }
      },
    }),
  }),
});

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<Wallet>) => {
      state.credits = action.payload.credits;
      state.euro = action.payload.euro;
    },
  },
});

export const { setWallet } = walletSlice.actions;

export const {
  useGetWalletBalanceQuery,
  useWithdrawWalletMutation,
  useBuyCreditsMutation,
  useGetAllWalletsQuery,
  useSetUserWalletQuery,
} = walletApi;
