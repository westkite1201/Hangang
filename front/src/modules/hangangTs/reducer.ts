import { HangangsState, HangangsAction } from './types';
import { GET_HANGANG_TEMP_SUCCESS, GET_HANGANG_TEMP_FAILURE } from './actions';
import { createReducer } from 'typesafe-actions';
import {
  asyncState
  //createAsyncReducer,
  //transformToArray,
} from '../../lib/utils/reducerUtils';
import produce from 'immer';

// 초깃값 설정
// const initialState: TodosState = {
//   userTodos: asyncState.initial()
// };

// export const getAsyncTodo = asyncAction<string, ITodo, string>(ASYNC_TOGO);
export const initialState: HangangsState = {
  riverTempData: asyncState.initial()
};

const todos = createReducer<HangangsState, HangangsAction>(initialState, {
  [GET_HANGANG_TEMP_SUCCESS]: (state, action) => {
    return produce(state, (draft) => {
      draft.riverTempData.data = action.payload;
      draft.riverTempData.loading = false;
      draft.riverTempData.error = null;
    });
  },
  [GET_HANGANG_TEMP_FAILURE]: (state, action) => ({
    ...state,
    riverTempData: asyncState.error(action.payload)
  })
  // [GET_USER_TODO]: (state) => ({
  //   ...state,
  //   userTodos: asyncState.load()
  // }),
  // [GET_HANGANG_TEMP_SUCCESS]: (state, action) => ({
  //   ...state,
  //   riverTempData: asyncState.success(action.payload)
  // })
});

export default todos;
