import { Callback, Pyaments } from "./payments.model";

export const initialState: Pyaments = {};

export const reducerPath = "paymentsApi";

export const CACHE_KEY = "Payments";

export const endpoints = {
  paymentsCallback: (callback: Callback, session_id: string) =>
    `payments/${callback}/${session_id}`,

  getAll: "payments/all",
};
