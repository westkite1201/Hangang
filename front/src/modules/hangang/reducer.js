import produce from 'immer';

export const initialState = {
  riverTempData: [],
  quotesData: []
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

      default: {
        break;
      }
    }
  });
};
