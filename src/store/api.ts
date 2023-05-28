import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { applicationState } from "./application/selector";
import { AppState } from "./store";
import { env } from "@environments/local.env";

export const baseQuery = fetchBaseQuery({
  baseUrl: env.API_URL,

  prepareHeaders: (headers, { getState }) => {
    const appState = getState() as AppState;
    const app = applicationState(appState);

    // If we have a token set in state, let's assume that we should be passing it.
    if (app) {
      headers.set("Authorization", `Bearer ${app.token}` ?? "");
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
