import { Wallet } from "./wallet.model";

export const initialState: Wallet = {
  credits: 0,
  euro: 0,
};

export const reducerPath = "walletApi";

export const CACHE_KEY = "Wallet";

export const endpoint = {
  get: "wallet/balance",
  withdraw: "wallet/withdraw",
  buyCredits: "credits/buy",
};
