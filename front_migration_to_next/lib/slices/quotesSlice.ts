import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getQuotes } from '../api/quotes';
import { IQuote, IGetQuotesParam } from '../../interfaces';

const hydrate = createAction<RootState>(HYDRATE);
const PAGE_COUNT = 5;
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
  loading: boolean;
  quotesArray: IQuote[];
  totalCount: number;
  isLast: boolean;
  pageNum: number;
  error: string | null;
}

interface InitialState {
  quotesData: IQuotesData;
}

const initialState: InitialState = {
  quotesData: {
    loading: false,
    quotesArray: [],
    totalCount: 0,
    isLast: false,
    pageNum: 1,
    error: '',
  },
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
      state.quotesData.loading = true;
    });

    builder.addCase(getQuotesThunk.fulfilled, (state, action) => {
      const { quotes_array, total_count } = action.payload;
      console.log('loadNotes.fulfiled', state, action.payload);
      state.quotesData.quotesArray.push(...quotes_array);
      state.quotesData.totalCount = total_count;
      state.quotesData.loading = false;
      state.quotesData.pageNum += 1;
      const maxPageNum = Math.ceil(total_count / PAGE_COUNT) + 1;
      if (maxPageNum === state.quotesData.pageNum) {
        state.quotesData.isLast = true;
        state.quotesData.loading = false;
      }
    });

    builder.addCase(getQuotesThunk.rejected, (state, action) => {
      state.quotesData.loading = false;
      //state.error = action.payload;
    });
  },
});

export default notesSlice.reducer;
