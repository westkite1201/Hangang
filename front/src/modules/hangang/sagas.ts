// import { GET_HANGANG_TEMP_REQUEST, getHangangTempAsync } from './actions';
import { GET_HANGANG_TEMP_REQUEST, getHangangTempAsync } from './reducer';
import { getHangangTemp, HangangTemp } from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';
//import createAsyncSaga from '../../lib/utils/createAsyncSaga';

function* getHangangTempSaga(
  //타입 유추
  action: ReturnType<typeof getHangangTempAsync.request>
) {
  try {
    console.log('getHangangTempSaga', action.payload);
    const hangangTemp: HangangTemp = yield call(getHangangTemp);
    console.log('hangangTemp ', hangangTemp);
    yield put(getHangangTempAsync.success(hangangTemp));
  } catch (e) {
    yield put(getHangangTempAsync.failure(e));
  }
}

export function* hangangSaga() {
  yield takeEvery(GET_HANGANG_TEMP_REQUEST, getHangangTempSaga);
}

/*  리펙토링 버전  */
// const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);
// export function* githubSaga() {
//   yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
// }
