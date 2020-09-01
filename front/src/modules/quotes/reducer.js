import produce from 'immer';
import { toast } from 'react-toastify';
export const initialState = {
  riverTempData: [],
  quotesData: [],
  backgroundImage: ''
};

export const GET_HANGANG_TEMP_REQUEST = 'quotes/GET_HANGANG_TEMP_REQUEST';
export const GET_HANGANG_TEMP_SUCCESS = 'quotes/GET_HANGANG_TEMP_SUCCESS';
export const GET_HANGANG_TEMP_FAILURE = 'quotes/GET_HANGANG_TEMP_FAILURE';

export const GET_QUOTES_REQUEST = 'quotes/GET_QUOTES_REQUEST';
export const GET_QUOTES_REQUEST_ADMIN = 'quotes/GET_QUOTES_REQUEST_ADMIN';
export const GET_QUOTES_SUCCESS = 'quotes/GET_QUOTES_SUCCESS';
export const GET_QUOTES_FAILURE = 'quotes/GET_QUOTES_FAILURE';
export const GET_QUOTES_SUBMIT = 'quotes/GET_QUOTES_SUBMIT';

export const SAVE_CANVAS_IMAGE_SUCCESS = 'quotes/SAVE_CANVAS_IMAGE_SUCCESS';
export const SAVE_CANVAS_IMAGE_FAILURE = 'quotes/SAVE_CANVAS_IMAGE_FAILURE';
export const SAVE_CANVAS_IMAGE_REQUEST = 'quotes/SAVE_CANVAS_IMAGE_REQUEST';

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_HANGANG_TEMP_SUCCESS: {
        draft.riverTempData = action.payload;

        break;
      }
      case GET_HANGANG_TEMP_FAILURE: {
        break;
      }

      case GET_QUOTES_SUCCESS: {
        draft.quotesData = action.payload;
        break;
      }
      case GET_QUOTES_FAILURE: {
        break;
      }

      case GET_QUOTES_SUBMIT: {
        break;
      }
      case SAVE_CANVAS_IMAGE_SUCCESS: {
        toast('저장에 성공하였습니다!ㅎㅎ', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      }
      case SAVE_CANVAS_IMAGE_FAILURE: {
        toast.warn('저장에 실패하였습니다!ㅜㅜ', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      }
      default: {
        break;
      }
    }
  });
};
