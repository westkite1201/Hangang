import { combineReducers } from '@reduxjs/toolkit';
import quotesReducer from './quotes/reducer';
import editReducer from './edit/reducer';
const reducers = { quotes: quotesReducer, edit: editReducer };

export let rootReducer = combineReducers({
  ...reducers,
});

export default function createReducer(injectedReducers = {}) {
  rootReducer = combineReducers({
    ...reducers,
    ...injectedReducers,
  });

  return rootReducer;
}

export type RootState = ReturnType<typeof rootReducer>;
