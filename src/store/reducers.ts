import { applicationApi, applicationSlice } from "./application/slice";
import { ArenaApi, arenaSlice } from "./arenas/slice";
import { bankAccountApi, bankAccountSlice } from "./bank-account/slice";
import {
  createMatchFormSlice,
  joinMatchFormSlice,
  matchesApi,
  matchesSlice,
} from "./matches/slice";
import { monstersApi, monstersSlice } from "./monsters/slice";
import { paymentsApi, paymentsSlice } from "./payments/slice";
import { tournamentApi, tournamentSlice } from "./tournament/slice";
import { userApi, userSlice } from "./user/slice";
import { walletApi, walletSlice } from "./wallet/slice";

export const reducers = {
  [applicationApi.reducerPath]: applicationApi.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [matchesApi.reducerPath]: matchesApi.reducer,
  [matchesSlice.name]: matchesSlice.reducer,
  [createMatchFormSlice.name]: createMatchFormSlice.reducer,
  [joinMatchFormSlice.name]: joinMatchFormSlice.reducer,
  [walletSlice.name]: walletSlice.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [bankAccountSlice.name]: bankAccountSlice.reducer,
  [bankAccountApi.reducerPath]: bankAccountApi.reducer,
  [monstersSlice.name]: monstersSlice.reducer,
  [monstersApi.reducerPath]: monstersApi.reducer,
  [ArenaApi.reducerPath]: ArenaApi.reducer,
  [arenaSlice.name]: arenaSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [paymentsSlice.name]: paymentsSlice.reducer,
  [tournamentApi.reducerPath]: tournamentApi.reducer,
  [tournamentSlice.name]: tournamentSlice.reducer,
} as const;
