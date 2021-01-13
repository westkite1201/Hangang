import { takeEvery } from 'redux-saga/effects';

export function* incrementAsync() {
  // yield delay(1000);
  // yield put(addCount(1));
}
function* getWeather(action: any) {
  try {
    // const weatherRes: WeatherRes = yield call(
    //   getWeatherDataPrivateMode,
    //   action.payload,
    // );
    // console.log('weatherRes ', weatherRes);
    // yield put(getWeatherShortTermLiveSuccess(weatherRes.items));
  } catch (e) {
    console.log('error');
    // yield put({
    //   type: updateQuotesAsync.failure,
    //   payload: { message: e.message }
    // });
  }
}
function* getWeatherShortTerm(action: any) {
  try {
    // const weatherRes: WeatherRes = yield call(
    //   getWeatherDataShortTermLivePrivateMode,
    //   action.payload,
    // );
    // yield put(getWeatherShortTermLiveSuccess(weatherRes.items));
  } catch (e) {
    console.log('error');
    // yield put({
    //   type: updateQuotesAsync.failure,
    //   payload: { message: e.message }
    // });
  }
}

export function* editSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
  yield takeEvery('test', getWeather);
  yield takeEvery('test2', getWeatherShortTerm);
}
