import { QuotseRes } from '../../lib/api/quotes_saga';
import {
  AsyncState,
  asyncState,
} from '../../lib/utils/reducerUtils';
import {createReducer,createAsyncAction,  ActionType} from 'typesafe-actions';
import { AxiosError } from 'axios';

export const UPDATE_QUOTES_REQUEST = 'QUOTES/UPDATE_QUOTES_REQUEST';
export const UPDATE_QUOTES_SUCCESS = 'QUOTES/UPDATE_QUOTES_SUCCESS';
export const UPDATE_QUOTES_FAILURE = 'QUOTES/UPDATE_QUOTES_FAILURE';

export const updateQuotesAsync = createAsyncAction(
  UPDATE_QUOTES_REQUEST,
  UPDATE_QUOTES_SUCCESS,
  UPDATE_QUOTES_FAILURE
)<string, QuotseRes, AxiosError>();

const actions = { updateQuotesAsync }

export type QuotesAction = ActionType<typeof actions>;

export type QuotesgState = {
  quotesData: {
    loading: boolean;
    data: [] | null;
    error:  any | null;
    totalCount: number;
    isLast:boolean;
  }
};

const initialState:QuotesgState = { 
  quotesData :{
    loading: false,
    data: [] ,
    error:  false,
    totalCount: 0,
    isLast:false
  }
} 

const reducer = createReducer<QuotesgState, QuotesAction>(initialState, {
  // [UPDATE_QUOTES_REQUEST]: state => ({
  //   ...state,
  //   quotesData: asyncState.load()
  // }),
  [UPDATE_QUOTES_SUCCESS]: (state, action) => ({
    ...state,
    quotesData: asyncState.success(action.payload).data
  }),
  [UPDATE_QUOTES_FAILURE]: (state, action) => ({
    ...state,
    ...state.quotesData.error =action.payload
  })
});



export default reducer;
