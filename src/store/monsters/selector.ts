import { createSelector } from "reselect";
import { store } from "../store";
type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.monster;
export const monstersState = createSelector(get, (monsters) => monsters);
