import produce from 'immer';

export const initialState = {
  memberInfo: []
};

export const LOGIN_REQUEST = 'login/LOGIN_REQUEST';
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const SIGN_UP_REQUEST = 'login/SIGN_UP_REQUEST';
export const SIGN_UP_FAILURE = 'login/SIGN_UP_FAILURE';
export const SIGN_UP_SUCCESS = 'login/SIGN_UP_SUCCESS';
export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_FAILURE: {
        break;
      }
      case LOGIN_SUCCESS: {
        draft.memberInfo = action.payload;
        break;
      }
      case SIGN_UP_FAILURE: {
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.memberInfo = action.payload;
        break;
      }
      default: {
        break;
      }
    }
  });
};
