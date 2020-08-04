import { getHangangTemp } from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_HANGANG_TEMP_SUCCESS, GET_HANGANG_TEMP_REQUEST, GET_HANGANG_TEMP_FAILURE } from './reducer';

function* getHangangTempSaga(action) {
  try {
    console.log('getHangangTemp', action.payload);
    const hangangTemp = yield call(getHangangTemp, action.payload);
    console.log('hangangTemp ', hangangTemp);
    yield put({
      type: GET_HANGANG_TEMP_SUCCESS,
      payload: {
        loading: false,
        data: hangangTemp.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: GET_HANGANG_TEMP_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

export function* hangangSaga() {
  yield takeEvery(GET_HANGANG_TEMP_REQUEST, getHangangTempSaga);
}
