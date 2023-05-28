import { baseQuery } from "@store/api";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import {
  BuyCreditsRequest,
  BuyCreditsResponse,
  Wallet,
  WithdrawRequest,
  WithdrawResponse,
} from "./wallet.model";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setLoading } from "@store/application/slice";
import Toast from "react-native-toast-message";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GenericApiError } from "@store/store.model";
import { withdrawErrorsHandler } from "./errors/withdraw";
import { getBalanceErrorsHandler } from "./errors/get-balance";
import { buyCreditsErrorsHandler } from "./errors/buy-credits";
import { Linking, Platform } from "react-native";

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
          Toast.show({
            type: "success",
            text1: "👋 Succès !",
            text2: "Votre demande de retrait a bien été prise en compte",
          });
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
          "x-request-from": Platform.OS,
        },
      }),
      async onQueryStarted(resource, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          console.log({ data });

          dispatch(setLoading(false));
          Toast.show({
            type: "success",
            text1: "🪙 Super !",
            text2: `Votre demande d'achat de ${resource.credits} crédits (${data.invoice.amount}€) a bien été prise en compte !`,
          });
          Linking.openURL(data.payment_url);
        } catch (err) {
          const error = err as GenericApiError;
          dispatch(setLoading(false));
          buyCreditsErrorsHandler(error);
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
      state = action.payload;
    },
  },
});

export const { setWallet } = walletSlice.actions;

export const {
  useGetWalletBalanceQuery,
  useWithdrawWalletMutation,
  useBuyCreditsMutation,
} = walletApi;
