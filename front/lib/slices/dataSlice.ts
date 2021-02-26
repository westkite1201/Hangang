import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getCorona } from '../api/data';
import { ICoronaInfo, IGetCoronaParams } from '../../interfaces';

const hydrate = createAction<RootState>(HYDRATE);
export const getCoronaThunk = createAsyncThunk(
  'ext/get-corona',
  async (params: IGetCoronaParams, thunkAPI) => {
    try {
      const response = await getCorona(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

interface InitialState {
  coronaStatusData: ICoronaInfo[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  coronaStatusData: [],
  loading: false,
  error: ''
};

const hanngangSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => action.payload['data']);

    builder.addCase(getCoronaThunk.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCoronaThunk.fulfilled, (state, action) => {
      state.coronaStatusData = action.payload;
      state.loading = false;
    });

    builder.addCase(getCoronaThunk.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default hanngangSlice.reducer;
