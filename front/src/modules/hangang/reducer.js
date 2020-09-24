import produce from 'immer';
const PAGE_COUNT = 5;
export const initialState = {
  riverTempData: [],
  quotesData: {
    loading: false,
    data: [],
    error: null,
    totalCount: 0,
    isLast: false
  },
  pageNum: 1
};

export const GET_HANGANG_TEMP_REQUEST = 'hangang/GET_HANGANG_TEMP_REQUEST';
export const GET_HANGANG_TEMP_SUCCESS = 'hangang/GET_HANGANG_TEMP_SUCCESS';
export const GET_HANGANG_TEMP_FAILURE = 'hangang/GET_HANGANG_TEMP_FAILURE';

export const GET_QUOTES_REQUEST = 'hangang/GET_QUOTES_REQUEST';
export const GET_QUOTES_REQUEST_ADMIN = 'hangang/GET_QUOTES_REQUEST_ADMIN';
export const GET_QUOTES_SUCCESS = 'hangang/GET_QUOTES_SUCCESS';
export const GET_QUOTES_FAILURE = 'hangang/GET_QUOTES_FAILURE';
export const GET_QUOTES_SUBMIT = 'hangang/GET_QUOTES_SUBMIT';
export const PUT_QUOTES_ACCEPTED = 'todos/PUT_QUOTES_ACCEPTED';

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_QUOTES_REQUEST: {
        console.log('GET_QUOTES_REQUEST ', draft.quotesData);
        if (draft.quotesData.isLast) {
          draft.quotesData.loading = false;
          break;
        }
        draft.quotesData.loading = true;
        break;
      }
      case GET_HANGANG_TEMP_SUCCESS: {
        draft.riverTempData = action.payload;
        break;
      }
      case GET_HANGANG_TEMP_FAILURE: {
        break;
      }

      case GET_QUOTES_SUCCESS: {
        const { loading, data, error } = action.payload;
        console.log('GET_QUOTES_SUCCESS ', loading, data, error);

        if (draft.quotesData.isLast) {
          break;
        }
        draft.quotesData.data = draft.quotesData.data.concat(data.quotes_array);
        draft.quotesData.loading = loading;
        draft.quotesData.error = error;
        draft.quotesData.totalCount = parseInt(data.total_count);
        draft.pageNum += 1;
        let maxPageNum = Math.ceil(parseInt(data.total_count) / PAGE_COUNT) + 1;
        console.log('maxPageNum', maxPageNum, 'draft.pageNum', draft.pageNum);
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

      case GET_QUOTES_SUBMIT: {
        break;
      }

      default: {
        break;
      }
    }
  });
};
