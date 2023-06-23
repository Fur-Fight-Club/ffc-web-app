import { createSelector } from "reselect";
import { store } from "../store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.user;
export const userState = createSelector(get, (user) => user);
