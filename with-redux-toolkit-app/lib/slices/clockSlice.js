// lib/slices/clockSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    lastUpdate: 0,
    light: true,
  },
  reducers: {
    tick: (state, action) => {
      console.log(action);
      state.lastUpdate = action.payload.lastUpdate;
      state.light = !!action.payload.light;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => action.payload.clock,
    // console.log('HYDRATE', action.payload.clock);
    //console.log('state', state);
    // state.lastUpdate = action.payload.clock.lastUpdate;
    // state.light = action.payload.clock.light;
  },
});

export const selectClock = (state) => state.clock;

export const { tick } = clockSlice.actions;

export default clockSlice.reducer;
