import { getHangangTemp } from './reducer';
import createAsyncSaga from '../../lib/utils/createAsyncSaga';
import * as API from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';
//import createAsyncSaga from '../../lib/utils/createAsyncSaga';

// function* getHangangTempSaga() {
//   try {
//     const hangangTemp: HangangTempRes = yield call(getHangangTemp);
//     console.log('hangangTemp ', hangangTemp);
//     yield put({
//       type: getHangangTemp.SUCCESS,
//       payload: { hangangTemp: hangangTemp.data }
//     });
//   } catch (e) {
//     yield put({
//       type: getHangangTemp.FAILURE,
//       payload: { message: e.message }
//     });
//   }
// }

const getHangangTempSaga = createAsyncSaga(getHangangTemp, API.getHangangTemp);

export function* hangangSaga() {
  yield takeEvery(getHangangTemp.request, getHangangTempSaga);
}

/*  리펙토링 버전  */
// const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);
// export function* githubSaga() {
//   yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
// }
