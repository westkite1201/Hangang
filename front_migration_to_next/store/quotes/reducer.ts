import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuoteResData, IQuotseRes } from '../../lib/api/quotes';
import _ from 'lodash';

type CurrentDisplayState = {
  loading: boolean;
  quotesData: IQuotseRes;
};

const initialState: CurrentDisplayState = {
  loading: false,
  quotesData: {
    result: '',
    message: '',
    data: {
      quotes_array: [],
      total_count: 0,
    },
  },
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    getQuotesRequest(state) {
      console.log('qetQuotes');
      state.loading = true;
    },
    getQuotesSuccess(state, { payload }: PayloadAction<IQuoteResData>) {
      state.quotesData.data = payload;
    },
  },
});

export const { getQuotesRequest, getQuotesSuccess } = quotesSlice.actions;

export default quotesSlice.reducer;
