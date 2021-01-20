import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";

import clockReducer from "./lib/slices/clockSlice";
import counterReducer from "./lib/slices/counterSlice";
import notesReducer from "./lib/slices/notesSlice";
//export const makeStore = () => {
// let store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     clock: clockReducer,
//     notes: notesReducer,
//   },
//   devTools: process.env.NODE_ENV === "development",
// });
// return store;
export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      clock: clockReducer,
      notes: notesReducer,
    },
    devTools: process.env.NODE_ENV === "development",
  });

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;

export const wrapper = createWrapper(makeStore, { debug: true });
