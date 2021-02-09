import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getHangangTemp } from '../api/hangang';
import { IHangangTemp } from '../../interfaces';

const hydrate = createAction<RootState>(HYDRATE);
export const getHangangTempThunk = createAsyncThunk(
  'hangang/getHangangTemp',
  async (_, thunkAPI) => {
    try {
      const response = await getHangangTemp();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

interface InitialState {
  riverTempData: IHangangTemp[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  riverTempData: [],
  loading: false,
  error: ''
};

const hanngangSlice = createSlice({
  name: 'hangang',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => action.payload['hangang']);

    builder.addCase(getHangangTempThunk.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getHangangTempThunk.fulfilled, (state, action) => {
      state.riverTempData = action.payload;
      state.loading = false;
    });

    builder.addCase(getHangangTempThunk.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default hanngangSlice.reducer;
