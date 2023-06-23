import { applicationApi, applicationSlice } from "./application/slice";
import { ArenaApi, arenaSlice } from "./arenas/slice";
import { bankAccountApi, bankAccountSlice } from "./bank-account/slice";
import { matchesApi, matchesSlice } from "./matches/slice";
import { walletApi, walletSlice } from "./wallet/slice";

export const reducers = {
  [applicationApi.reducerPath]: applicationApi.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [matchesApi.reducerPath]: matchesApi.reducer,
  [matchesSlice.name]: matchesSlice.reducer,
  [walletSlice.name]: walletSlice.reducer,
  [arenaSlice.name]: arenaSlice.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [ArenaApi.reducerPath]: ArenaApi.reducer,
  [bankAccountSlice.name]: bankAccountSlice.reducer,
  [bankAccountApi.reducerPath]: bankAccountApi.reducer,
} as const;
