import produce from 'immer';
import { toast } from 'react-toastify';
const PAGE_COUNT = 5;
const TOAST_OPTION = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};
export const initialState = {
  quotesData: {
    loading: false,
    data: [],
    error: null,
    totalCount: 0,
    isLast: false
  },
  pageNum: 1,
  /* admin 용  */
  quotesAdminData: {
    loading: false,
    data: [],
    error: null
  },

  selectedBackgroundUrl: { url: '', isUnsplash: true, id: '' }
};

export const GET_QUOTES_ADMIN_REQUEST = 'quotes/GET_QUOTES_ADMIN_REQUEST';
export const GET_QUOTES_ADMIN_SUCCESS = 'quotes/GET_QUOTES_ADMIN_SUCCESS';
export const GET_QUOTES_ADMIN_FAILURE = 'quotes/GET_QUOTES_ADMIN_FAILURE';
export const GET_QUOTES_REQUEST = 'quotes/GET_QUOTES_REQUEST';
export const GET_QUOTES_SUCCESS = 'quotes/GET_QUOTES_SUCCESS';
export const GET_QUOTES_FAILURE = 'quotes/GET_QUOTES_FAILURE';
export const GET_QUOTES_SUBMIT = 'quotes/GET_QUOTES_SUBMIT';
export const SUBMIT_QUOTES_REQUEST = 'quotes/SUBMIT_QUOTES_REQUEST';
export const SUBMIT_QUOTES_SUCCESS = 'quotes/SUBMIT_QUOTES_SUCCESS';
export const SUBMIT_QUOTES_FAILURE = 'quotes/SUBMIT_QUOTES_FAILURE';

//fabric Banner Maker 사용
export const SAVE_CANVAS_IMAGE_SUCCESS = 'quotes/SAVE_CANVAS_IMAGE_SUCCESS';
export const SAVE_CANVAS_IMAGE_FAILURE = 'quotes/SAVE_CANVAS_IMAGE_FAILURE';
export const SAVE_CANVAS_IMAGE_REQUEST = 'quotes/SAVE_CANVAS_IMAGE_REQUEST';
//css Banner Maker 사용
export const SET_BACKGROUND_IMAGE = 'quotes/SET_BACKGROUND_IMAGE';
export const UPLOAD_IMAGE_TO_UNSPLASH_REQUEST =
  'quotes/UPLOAD_IMAGE_TO_UNSPLASH_REQUEST';
export const UPLOAD_IMAGE_TO_UNSPLASH_SUCCESS =
  'quotes/UPLOAD_IMAGE_TO_UNSPLASH_SUCCESS';
export const UPLOAD_IMAGE_TO_UNSPLASH_FAILURE =
  'quotes/UPLOAD_IMAGE_TO_UNSPLASH_FAILURE';

export const PUT_QUOTES_ACCEPTED = 'quotes/PUT_QUOTES_ACCEPTED';

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_BACKGROUND_IMAGE: {
        draft.selectedBackgroundUrl = action.payload;
        break;
      }
      case GET_QUOTES_SUBMIT: {
        break;
      }
      /* gridView  */
      case GET_QUOTES_REQUEST: {
        if (draft.quotesData.isLast) {
          draft.quotesData.loading = false;
          break;
        }
        draft.quotesData.loading = true;
        break;
      }
      case GET_QUOTES_SUCCESS: {
        const { loading, data, error } = action.payload;
        if (draft.quotesData.isLast) {
          break;
        }
        draft.quotesData.data = draft.quotesData.data.concat(data.quotes_array);
        draft.quotesData.loading = loading;
        draft.quotesData.error = error;
        draft.quotesData.totalCount = parseInt(data.total_count);
        draft.pageNum += 1;
        const maxPageNum =
          Math.ceil(parseInt(data.total_count) / PAGE_COUNT) + 1;
        if (maxPageNum === draft.pageNum) {
          draft.quotesData.isLast = true;
          draft.quotesData.loading = false;
          break;
        }
        break;
      }
      case GET_QUOTES_FAILURE: {
        draft.quotesData.data = action.payload.data;
        draft.quotesData.error = action.payload.error;
        break;
      }

      case GET_QUOTES_ADMIN_SUCCESS: {
        const { loading, data, error } = action.payload;
        draft.quotesAdminData.data = data;
        draft.quotesAdminData.loading = loading;
        draft.quotesAdminData.error = error;
        break;
      }
      case GET_QUOTES_ADMIN_FAILURE: {
        const { loading, error } = action.payload;
        draft.quotesAdminData.loading = loading;
        draft.quotesAdminData.error = error;
        toast.warn('데이터를 불러오는데 실패하였습니다!ㅜㅜ', TOAST_OPTION);
        break;
      }

      case SAVE_CANVAS_IMAGE_SUCCESS: {
        toast.success('저장에 성공하였습니다!ㅎㅎ', TOAST_OPTION);
        break;
      }
      case SAVE_CANVAS_IMAGE_FAILURE: {
        toast.warn('저장에 실패하였습니다!ㅜㅜ', TOAST_OPTION);
        break;
      }

      case SUBMIT_QUOTES_SUCCESS: {
        toast.success('저장에 성공하였습니다!ㅎㅎ', TOAST_OPTION);
        break;
      }
      case SUBMIT_QUOTES_FAILURE: {
        toast.warn('저장에 실패하였습니다!ㅜㅜ', TOAST_OPTION);
        break;
      }
      case UPLOAD_IMAGE_TO_UNSPLASH_SUCCESS: {
        toast.success('저장에 성공하였습니다!ㅎㅎ', TOAST_OPTION);
        break;
      }

      case UPLOAD_IMAGE_TO_UNSPLASH_FAILURE: {
        toast.warn('저장에 실패하였습니다!ㅜㅜ', TOAST_OPTION);
        break;
      }

      default: {
        break;
      }
    }
  });
};
