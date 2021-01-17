import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/store";

export type Weapon = {
  id: string;
  name: string;
};

export type WeaponsState = {
  weapons: Array<Weapon>;
  loading: boolean;
  error?: string;
};

export const weaponsReducer = createSlice({
  name: "characters",
  initialState: {} as WeaponsState,
  reducers: {
    start(state) {
      state.loading = true;
      state.error = undefined;
    },
    success(state, action: PayloadAction<Weapon[]>) {
      state.weapons = action.payload;
      state.loading = false;
      state.error = undefined;
    },
    failure(state) {
      state.loading = false;
      state.error = "Unable to fetch characters";
    },
  },
});

export default weaponsReducer.reducer;

export const fetchWeaponsThunk = (): AppThunk => async (dispatch: any) => {
  try {
    dispatch(weaponsReducer.actions.start());
    const res: Weapon[] = await new Promise((resolve) => {
      const weapon: Weapon = {
        id: "1",
        name: "plop",
      };
      setTimeout(() => resolve([weapon]), 2000);
    });
    return dispatch(weaponsReducer.actions.success(res));
  } catch (err) {
    return dispatch(weaponsReducer.actions.failure());
  }
};
