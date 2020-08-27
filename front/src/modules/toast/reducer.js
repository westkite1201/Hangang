import produce from 'immer';
import { toast } from 'react-toastify';
export const initialState = {};

export const REQUEST_TOAST = 'toast/REQUEST_TOAST';
export const SUCCESS_TOAST = 'toast/SUCCESS_TOAST';
export const FAILURE_TOAST = 'toast/FAILURE_TOAST';

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SUCCESS_TOAST: {
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
      case FAILURE_TOAST: {
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
