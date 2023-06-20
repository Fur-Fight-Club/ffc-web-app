import { Wallet } from "./wallet.model";

export const initialState: Wallet = {
  credits: 0,
  euro: 0,
};

export const reducerPath = "walletApi";

export const CACHE_KEY = "Wallet";

export const endpoint = {
  get: `${process.env.NEXT_PUBLIC_ENDPOINT}/wallet/balance`,
  withdraw: `${process.env.NEXT_PUBLIC_ENDPOINT}/wallet/withdraw`,
  buyCredits: `${process.env.NEXT_PUBLIC_ENDPOINT}/credits/buy`,
};
