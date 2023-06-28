import { createSelector } from "reselect";
import { store } from "../store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.payments;
export const paymentsState = createSelector(get, (payments) => payments);
