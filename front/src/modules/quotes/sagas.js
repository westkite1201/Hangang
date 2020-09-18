import {
  getHangangTemp,
  getQuotes,
  getSubmitQuotes,
  getQuotesAdmin,
  saveCanvasImage,
  submitQuotes
} from '../../lib/api/hangang';
import { getImageDownloadToUrl } from '../../lib/api/unsplash';
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
  SAVE_CANVAS_IMAGE_REQUEST,
  SUBMIT_QUOTES_REQUEST,
  SUBMIT_QUOTES_SUCCESS,
  SUBMIT_QUOTES_FAILURE,
  UPLOAD_IMAGE_TO_UNSPLASH_REQUEST,
  UPLOAD_IMAGE_TO_UNSPLASH_SUCCESS,
  UPLOAD_IMAGE_TO_UNSPLASH_FAILURE
} from './reducer';
import { REQUEST_TOAST } from '../toast/reducer';
import { extractImageFileName } from '../../lib/helper';
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
    console.log('quotesData ', quotesData);
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
function* submitQuotesSaga(action) {
  try {
    console.log('submitQuotes', action);
    // unsplash 에서 선택후 업로드시 업로드 후에
    const { isUnsplash } = action.payload;

    if (isUnsplash) {
      yield put({
        type: REQUEST_TOAST,
        payload: {
          message: 'unsplash 이미지 업로드'
        }
      });
      const imageUploadResponse = yield call(
        getImageDownloadToUrl,
        action.payload
      );
      const { message, status } = imageUploadResponse;
      console.log('[seo] imageUploadResponse', imageUploadResponse);
      if (message === 'success' || status === ' 200') {
        action.payload.backgroundImagePath = extractImageFileName(
          action.payload
        );
        const submitQuotesResponse = yield call(submitQuotes, action.payload);
        yield put({
          type: SUBMIT_QUOTES_SUCCESS,
          payload: {
            loading: false,
            data: submitQuotesResponse.data,
            error: null
          }
        });
      } else {
        yield put({
          type: UPLOAD_IMAGE_TO_UNSPLASH_FAILURE,
          payload: {
            loading: false,
            data: [],
            error: 'image upload fail'
          }
        });
      }
    } else {
      const submitQuotesResponse = yield call(submitQuotes, action.payload);
      yield put({
        type: SUBMIT_QUOTES_SUCCESS,
        payload: {
          loading: false,
          data: submitQuotesResponse.data,
          error: null
        }
      });
    }
  } catch (e) {
    yield put({
      type: SUBMIT_QUOTES_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

function* uploadImageSaga(action) {
  try {
    console.log('submitQuotes');
    const submitQuotesResponse = yield call(
      getImageDownloadToUrl,
      action.payload
    );
    yield put({
      type: UPLOAD_IMAGE_TO_UNSPLASH_SUCCESS,
      payload: {
        loading: false,
        data: submitQuotesResponse.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGE_TO_UNSPLASH_FAILURE,
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
  yield takeEvery(SUBMIT_QUOTES_REQUEST, submitQuotesSaga);
  yield takeEvery(UPLOAD_IMAGE_TO_UNSPLASH_REQUEST, uploadImageSaga);
}
