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

export const SNS_LOGIN_REQUEST = 'login/SNS_LOGIN_REQUEST';
export const SNS_LOGIN_FAILURE = 'login/SNS_LOGIN_FAILURE';
export const SNS_LOGIN_SUCCESS = 'login/SNS_LOGIN_SUCCESS';

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
        console.log('action.payload ', action.payload);
        localStorage.setItem('access_token', action.payload.data.token);
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
      case SNS_LOGIN_SUCCESS: {
        console.log('SNS_LOGIN SUCCESS: ', action.payload)
        break; 
      }
      case SNS_LOGIN_FAILURE: {
        console.log('SNS_LOGIN_FAIL: ', action.payload)
        break;
      }
      case SNS_LOGIN_REQUEST: {
        console.log('SNS_LOGIN REQUEST', action.payload)
        break;
      }
      default: {
        break;
      }
    }
  });
};
