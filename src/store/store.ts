import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action, Middleware, MiddlewareAPI } from "redux";
import { reducers } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers } from "redux";
import { applicationApi } from "./application/slice";
import { walletApi } from "./wallet/slice";
import { bankAccountApi } from "./bank-account/slice";

const combinedReducers = combineReducers({
  ...reducers,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
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
      bankAccountApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
