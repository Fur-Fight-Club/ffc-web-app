import { Arenas } from "./arenas.model";

export const initialState: Arenas = {
  arenas: [],
};

export const reducerPath = "arenasApi";

export const CACHE_KEY = "Arenas";

export const endpoint = {
  get: "/arenas",
};
