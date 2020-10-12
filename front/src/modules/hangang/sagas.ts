import { GET_HANGANG_TEMP } from './reducer';
import {
  getHangangTemp,
  HangangTemp,
  HangangTempRes
} from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';
//import createAsyncSaga from '../../lib/utils/createAsyncSaga';

function* getHangangTempSaga() {
  try {
    const hangangTemp: HangangTempRes = yield call(getHangangTemp);
    console.log('hangangTemp ', hangangTemp);
    yield put({
      type: GET_HANGANG_TEMP.SUCCESS,
      payload: { hangangTemp: hangangTemp.data }
    });
  } catch (e) {
    yield put({
      type: GET_HANGANG_TEMP.FAILURE,
      payload: { message: e.message }
    });
  }
}

export function* hangangSaga() {
  yield takeEvery(GET_HANGANG_TEMP.REQUEST, getHangangTempSaga);
}

/*  리펙토링 버전  */
// const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);
// export function* githubSaga() {
//   yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
// }
