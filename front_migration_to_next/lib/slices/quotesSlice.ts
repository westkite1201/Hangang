import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getQuotes } from '../api/quotes';
import { IQuote, IGetQuotesParam } from '../../interfaces';

const hydrate = createAction<RootState>(HYDRATE);

export const getQuotesThunk = createAsyncThunk(
  'quotes/getQuotes',
  async (params: IGetQuotesParam, thunkAPI) => {
    try {
      const response = await getQuotes(params);
      console.log('response ', response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export interface IQuotesData {
  quotesArray: IQuote[];
  totalCount: number;
}

interface InitialState {
  loading: boolean;
  quotesData: IQuotesData;
  error: '';
}

const initialState: InitialState = {
  loading: false,
  quotesData: {
    quotesArray: [],
    totalCount: 0,
  },
  error: '',
};

const notesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => action.payload['quotes']);

    builder.addCase(getQuotesThunk.pending, (state, action) => {
      console.log('loadNotes pending');
      //state.quotesData = [];
      state.loading = true;
    });

    builder.addCase(getQuotesThunk.fulfilled, (state, action) => {
      console.log('loadNotes.fulfiled', state, action.payload);
      state.quotesData.quotesArray.push(...action.payload.quotes_array);
      state.quotesData.totalCount = action.payload.total_count;
      state.loading = false;
    });

    builder.addCase(getQuotesThunk.rejected, (state, action) => {
      state.loading = false;
      //state.error = action.payload;
    });
  },
});

export default notesSlice.reducer;
