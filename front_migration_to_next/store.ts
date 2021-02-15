import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import quotesReducer from './lib/slices/quotesSlice';
import hangangReducer from './lib/slices/hangangSlice';
import loginReducer from './lib/slices/loginSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      quotes: quotesReducer,
      hangang: hangangReducer,
      login: loginReducer
    },
    devTools: process.env.NEXT_PUBLIC_NODE_ENV === 'development'
  });

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;

export const wrapper = createWrapper(makeStore, { debug: true });
