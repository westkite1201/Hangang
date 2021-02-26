import {
  getQuotes,
  getSubmitQuotes,
  getQuotesAdmin,
  saveCanvasImage,
  submitQuotes,
  updateQuotesAccepted
} from '../../lib/api/quotes';
import { getImageDownloadToUrl } from '../../lib/api/unsplash';
import { put, call, takeEvery, delay, takeLatest } from 'redux-saga/effects';
import {
  GET_QUOTES_REQUEST,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAILURE,
  GET_QUOTES_ADMIN_REQUEST,
  GET_QUOTES_ADMIN_FAILURE,
  GET_QUOTES_ADMIN_SUCCESS,
  SAVE_CANVAS_IMAGE_FAILURE,
  SAVE_CANVAS_IMAGE_SUCCESS,
  SAVE_CANVAS_IMAGE_REQUEST,
  GET_QUOTES_SUBMIT,
  SUBMIT_QUOTES_REQUEST,
  SUBMIT_QUOTES_SUCCESS,
  SUBMIT_QUOTES_FAILURE,
  UPLOAD_IMAGE_TO_UNSPLASH_REQUEST,
  UPLOAD_IMAGE_TO_UNSPLASH_SUCCESS,
  UPLOAD_IMAGE_TO_UNSPLASH_FAILURE,
  PUT_QUOTES_ACCEPTED
} from './reducer';
import { REQUEST_TOAST } from '../toast/reducer';
import { extractImageFileName } from '../../lib/helper';

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
      //console.log('[seo] imageUploadResponse', imageUploadResponse);
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

function* getQuotesSaga(action) {
  try {
    console.log('getQuotes', action.payload);
    const quotesData = yield call(getQuotes, action.payload);
    console.log('quotesData', quotesData);
    yield delay(500);
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
      type: GET_QUOTES_ADMIN_SUCCESS,
      payload: {
        loading: false,
        data: quotesSubmitData.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: GET_QUOTES_ADMIN_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

function* putQuotesAccepted(action) {
  try {
    const quotesAcceptedData = yield call(updateQuotesAccepted, action.payload);
    yield put({
      type: GET_QUOTES_SUCCESS,
      payload: {
        loading: false,
        data: quotesAcceptedData.data,
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

export function* quotesSaga() {
  yield takeEvery(SAVE_CANVAS_IMAGE_REQUEST, saveCanvasImageSaga);
  yield takeEvery(SUBMIT_QUOTES_REQUEST, submitQuotesSaga);
  yield takeEvery(UPLOAD_IMAGE_TO_UNSPLASH_REQUEST, uploadImageSaga);

  yield takeLatest(GET_QUOTES_REQUEST, getQuotesSaga);
  yield takeEvery(GET_QUOTES_SUBMIT, getSubmitQuotesSaga);
  yield takeEvery(GET_QUOTES_ADMIN_REQUEST, getQuotesSagaAdmin);
  yield takeEvery(PUT_QUOTES_ACCEPTED, putQuotesAccepted);
}
