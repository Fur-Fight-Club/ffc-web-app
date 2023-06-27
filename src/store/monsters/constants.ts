import { Monster } from "./monsters.model";

export const initialState: Monster[] = [];

export const reducerPath = "monstersApi";

export const CACHE_KEY = "Monsters";

export const endpoint = {
  get: "monster",
  create: "monster",
  getOne: (id: number) => `monster/byId/${id}`,
  patch: (id: number) => `monster/${id}`,
  delete: (id: number) => `monster/${id}`,
};
