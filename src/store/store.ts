import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { Action, Middleware, MiddlewareAPI } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ThunkAction } from "redux-thunk";
import { reducers } from "./reducers";

import { combineReducers } from "redux";
import { applicationApi } from "./application/slice";
import { ArenaApi } from "./arenas/slice";
import { monstersApi } from "./monsters/slice";
import { matchesApi } from "./matches/slice";
import { bankAccountApi } from "./bank-account/slice";
import { walletApi } from "./wallet/slice";
import { userApi } from "./user/slice";

const combinedReducers = combineReducers({
  ...reducers,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!", action.error);
    } else {
      //console.log(action);
    }

    return next(action);
  };

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      rtkQueryErrorLogger,
      applicationApi.middleware,
      walletApi.middleware,
      bankAccountApi.middleware,
      ArenaApi.middleware,
      monstersApi.middleware,
      matchesApi.middleware,
      userApi.middleware
    ),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
