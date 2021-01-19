import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import clockReducer from './lib/slices/clockSlice';
import counterReducer from './lib/slices/counterSlice';
import notesReducer from './lib/slices/notesSlice';
export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      clock: clockReducer,
      notes: notesReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
  });

export const wrapper = createWrapper(makeStore);
