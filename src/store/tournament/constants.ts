import { Tournament } from "./tournament.model";

export const initialState: Tournament[] = [];

export const reducerPath = "tournamentApi";

export const CACHE_KEY = "Tournament";

export const endpoints = {
  getAll: "tournaments",
  get: (id: number) => `tournaments/${id}`,
  create: "tournaments",
  update: (id: number) => `tournaments/${id}`,
  delete: (id: number) => `tournaments/${id}`,
  joinTournament: (id: number) => `tournaments/${id}/join`,
  startTournament: (id: number) => `tournaments/${id}/start`,
  endRound: (id: number) => `tournaments/${id}/round/end`,
};
