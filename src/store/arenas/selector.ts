import { createSelector } from "reselect";
import { store } from "../store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.arena;
export const arenasState = createSelector(get, (arenas) => arenas);
