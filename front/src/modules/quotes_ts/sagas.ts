import { GET_HANGANG_TEMP_REQUEST,getHangangTempertureAsync } from './reducer';
import createAsyncSaga from '../../lib/utils/createAsyncSaga';
import {getHangangTemp} from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';

const getHangangTempSaga = createAsyncSaga(getHangangTempertureAsync, getHangangTemp);

export function* hangangSaga() {
  yield takeEvery(GET_HANGANG_TEMP_REQUEST, getHangangTempSaga);
}


