import { createSelector } from "reselect";
import { store } from "../store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.matches;
export const matchesState = createSelector(get, (matches) => matches);

const getCreateMatchForm = (state: RootState) => state.createMatchForm;
export const createMatchFormState = createSelector(
  getCreateMatchForm,
  (create) => create
);
