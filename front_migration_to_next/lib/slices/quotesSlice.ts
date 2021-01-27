import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store';
import { getQuotes, submitQuotes } from '../api/quotes';
import { IQuote, IGetQuotesParam } from '../../interfaces';
import { getImageDownloadToUrl } from '..//api/unsplash';
import { extractImageFileName } from '../helper';
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

export const uploadImageThunk = createAsyncThunk(
  'quotes/getQuotes',
  async (params: IGetQuotesParam, thunkAPI) => {
    try {
      const submitQuotesResponse = await getImageDownloadToUrl(params);
      console.log('response ', submitQuotesResponse);
      return submitQuotesResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// 제출
// 1.이미지 업로드 => 2. quotes 업로드
export const submitQuotesThunk = createAsyncThunk(
  'quotes/getQuotes',
  async (params: IQuote, thunkAPI) => {
    const { isUnsplash } = params;
    try {
      if (isUnsplash) {
        const imageUploadResponse = await getImageDownloadToUrl(params);
        const { message, status } = imageUploadResponse;
        //console.log('[seo] imageUploadResponse', imageUploadResponse);
        if (message === 'success' || status === ' 200') {
          params.backgroundImagePath = extractImageFileName(params);
          const submitQuotesResponse = await submitQuotes(params);
          console.log('response ', submitQuotesResponse);
          return submitQuotesResponse;
        }
      }
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
export interface ISelectedBackgroundUrl {
  url: string;
  isUnsplash: string;
  id: string;
}
interface InitialState {
  quotesData: IQuotesData;
  selectedBackgroundUrl: ISelectedBackgroundUrl;
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
  selectedBackgroundUrl: {
    url: '',
    isUnsplash: '',
    id: '',
  },
};

const quotesSlice = createSlice({
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

export default quotesSlice.reducer;
