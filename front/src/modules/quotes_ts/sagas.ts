import { UPDATE_QUOTES_SUCCESS,UPDATE_QUOTES_REQUEST,updateQuotesAsync } from './reducer';
//import createAsyncSaga from '../../lib/utils/createAsyncSaga';
import {updateQuote,QuoteResData} from '../../lib/api/quotes_saga';
import { put, call, takeEvery } from 'redux-saga/effects';

//const updatqQuotesSaga = createAsyncSaga(updateQuotesAsync, updateQuote);
function* updatqQuotesSaga(action: ReturnType<typeof updateQuotesAsync.request>) {
  try {
    const quotesRes: QuoteResData = yield call(updateQuote, action.payload);
    console.log('quotesRes ', quotesRes);
    yield put({
      type: UPDATE_QUOTES_SUCCESS,
      payload: { quotes_array: quotesRes.quotes_array , totalCount : quotesRes.total_count}
    });
  } catch (e) {
    yield put({
      type: updateQuotesAsync.failure,
      payload: { message: e.message }
    });
  }
}


export function* quotesSaga_() {
  yield takeEvery(UPDATE_QUOTES_REQUEST, updatqQuotesSaga);
}


