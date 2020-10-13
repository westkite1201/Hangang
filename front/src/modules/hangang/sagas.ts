import { GET_HANGANG_TEMP_REQUEST,getHangangTempertureAsync } from './reducer';
import createAsyncSaga from '../../lib/utils/createAsyncSaga';
import {getHangangTemp} from '../../lib/api/hangang';
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

const getHangangTempSaga = createAsyncSaga(getHangangTempertureAsync, getHangangTemp);

export function* hangangSaga() {
  yield takeEvery(GET_HANGANG_TEMP_REQUEST, getHangangTempSaga);
}

/*  리펙토링 버전  */
// const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);
// export function* githubSaga() {
//   yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
// }
