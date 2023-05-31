import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../api';
import { CACHE_KEY, initialState, reducerPath } from './constants';

export const matchesApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: [CACHE_KEY],
  endpoints: (builder) => ({}),
});

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
});

export const {} = matchesSlice.actions;

export const {} = matchesApi;
