import { createSelector } from "reselect";
import { store } from "@store/store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.bankAccount;
export const bankAccountState = createSelector(
  get,
  (bankAccount) => bankAccount
);
