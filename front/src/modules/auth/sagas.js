import {
  loginHangang,
  signUpHangang,
  snsLoginHangang,
  logoutHangang
} from '../../lib/api/auth';
import { put, call, takeEvery } from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SNS_LOGIN_REQUEST,
  SNS_LOGIN_FAILURE,
  SNS_LOGIN_SUCCESS,
  LOGOUT_REQUEST
} from './reducer';

function* loginHangangSaga(action) {
  try {
    console.log('loginHangangSaga', action.payload);
    const loginData = yield call(loginHangang, action.payload);
    console.log('loginData ', loginData);
    if (loginData && loginData.status === 200) {
      yield put({
        type: LOGIN_SUCCESS,
        payload: {
          loading: false,
          data: loginData,
          error: null
        }
      });
    } else {
      yield put({
        type: LOGIN_FAILURE,
        payload: {
          loading: false,
          data: [],
          error: 'login fail'
        }
      });
    }
  } catch (e) {
    console.log('error ', e);
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
function* signUpHangangSaga(action) {
  try {
    console.log('signUpHangangSaga', action.payload);
    const signUpData = yield call(signUpHangang, action.payload);
    console.log('signUpData ', signUpData);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: {
        loading: false,
        data: signUpData.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}
function* snsLoginHangangSaga(action) {
  try {
    const snsLoginData = yield call(snsLoginHangang, action.payload);
    yield put({
      type: SNS_LOGIN_SUCCESS,
      payload: {
        loading: false,
        data: snsLoginData,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: SNS_LOGIN_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}
function* logoutAuthSaga(action) {
  try {
    const logoutData = yield call(logoutHangang, action.payload);
  } catch (error) {}
}
export function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginHangangSaga);
  yield takeEvery(SIGN_UP_REQUEST, signUpHangangSaga);
  yield takeEvery(SNS_LOGIN_REQUEST, snsLoginHangangSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutAuthSaga);
}
