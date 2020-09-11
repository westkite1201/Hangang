import produce from 'immer';
import { toast } from 'react-toastify';

const TOAST_OPTION = {
  position: 'top-right',
  autoClose: 3000,
  //hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};
export const initialState = {
  memberInfo: {
    token: '',
    isLogin: false
  }
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
        toast.error(
          '로그인 실패하였습니다. 아이디랑 비밀번호를 확인해주세요!',
          TOAST_OPTION
        );
        break;
      }
      case LOGIN_SUCCESS: {
        draft.memberInfo.isLogin = true;
        localStorage.setItem('access_token', action.payload.token);
        toast('로그인에 성공하였습니다!', TOAST_OPTION);
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
