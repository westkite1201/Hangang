import { getLogin, get } from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from './reducer';

function* loginSaga(action) {
  try {
    console.log('getHangangTemp', action.payload);
    const hangangTemp = yield call(getHangangTemp, action.payload);
    console.log('hangangTemp ', hangangTemp);
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        loading: false,
        data: hangangTemp.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

export function* hangangSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}
