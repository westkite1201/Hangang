/* eslint-disable @typescript-eslint/camelcase */

import { getQuotesRequest, getQuotesSuccess } from './reducer';
import { getQuotes, IQuoteResData } from '../../lib/api/quotes';
import { put, call, takeEvery } from 'redux-saga/effects';

function* getQuotesSaga(action: { payload: any }) {
  try {
    const quotesRes: IQuoteResData = yield call(getQuotes, action.payload);
    console.log('quotesRes ', quotesRes);
    yield put(getQuotesSuccess(quotesRes));
  } catch (e) {
    console.log('error', e);
  }
}

export function* quotesSaga() {
  yield takeEvery(getQuotesRequest, getQuotesSaga);
}
