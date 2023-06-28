import { CreateMatchForm, Matches } from "./matches.model";

export const initialState: Matches = {
  matches: [],
};

export const createMatchFormInitialState: CreateMatchForm = {
  step: 0,
  monster: null,
  arena: null,
  bet: 0,
};

export const reducerPath = "matchesApi";

export const CACHE_KEY = "Matches";

export const endpoint = {
  getAll: "/match",
  getOne: (id: number) => `/match/${id}`,
  placeBet: (id: number) => `/match/${id}/bet`,
  sendMessage: (id: number) => `/match/${id}/message`,
  createMatch: "/match/create",
  joinMatch: (id: number) => `/match/join/${id}`,
  joinMatchValidate: (id: number) => `/match/join/validate/${id}`,
  joinMatchReject: (id: number) => `/match/join/reject/${id}`,
  closeMatch: (id: number) => `/match/close/${id}`,
  deleteMatch: (id: number) => `/match/delete/${id}`,
};
