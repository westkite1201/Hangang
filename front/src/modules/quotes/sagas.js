import {
  getHangangTemp,
  getQuotes,
  getSubmitQuotes,
  getQuotesAdmin,
  saveCanvasImage
} from '../../lib/api/hangang';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_HANGANG_TEMP_SUCCESS,
  GET_HANGANG_TEMP_REQUEST,
  GET_HANGANG_TEMP_FAILURE,
  GET_QUOTES_REQUEST,
  GET_QUOTES_REQUEST_ADMIN,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAILURE,
  GET_QUOTES_SUBMIT,
  SAVE_CANVAS_IMAGE_FAILURE,
  SAVE_CANVAS_IMAGE_SUCCESS,
  SAVE_CANVAS_IMAGE_REQUEST
} from './reducer';

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

function* getQuotesSaga(action) {
  try {
    console.log('getQuotes', action.payload);
    const quotesData = yield call(getQuotes, action.payload);

    yield put({
      type: GET_QUOTES_SUCCESS,
      payload: {
        loading: false,
        data: quotesData.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: GET_QUOTES_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

function* getQuotesSagaAdmin(action) {
  try {
    const quotesSubmitData = yield call(getQuotesAdmin, action.payload);
    yield put({
      type: GET_QUOTES_SUCCESS,
      payload: {
        loading: false,
        data: quotesSubmitData.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: GET_QUOTES_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

function* getSubmitQuotesSaga(action) {
  try {
    const quotesSubmitData = yield call(getSubmitQuotes, action.payload);
    yield put({
      type: GET_QUOTES_SUCCESS,
      payload: {
        loading: false,
        data: quotesSubmitData.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: GET_QUOTES_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

function* saveCanvasImageSaga(action) {
  try {
    console.log('saveCanvasImageSaga');
    const saveCanvasImageResponse = yield call(saveCanvasImage, action.payload);
    yield put({
      type: SAVE_CANVAS_IMAGE_SUCCESS,
      payload: {
        loading: false,
        data: saveCanvasImageResponse.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: SAVE_CANVAS_IMAGE_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

export function* quotesSaga() {
  yield takeEvery(GET_HANGANG_TEMP_REQUEST, getHangangTempSaga);
  yield takeEvery(GET_QUOTES_REQUEST, getQuotesSaga);
  yield takeEvery(GET_QUOTES_SUBMIT, getSubmitQuotesSaga);
  yield takeEvery(GET_QUOTES_REQUEST_ADMIN, getQuotesSagaAdmin);
  yield takeEvery(SAVE_CANVAS_IMAGE_REQUEST, saveCanvasImageSaga);
}