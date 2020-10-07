import { HangangsState, HangangsAction } from './types';
import { createReducer, createAsyncAction } from 'typesafe-actions';
import { asyncState } from '../../lib/utils/reducerUtils';
import { HangangTemp } from '../../lib/api/hangang';
import { AxiosError } from 'axios';

// 초깃값 설정
// const initialState: TodosState = {
//   userTodos: asyncState.initial()
// };

export const ADD_TODO = 'todos/ADD_TODO';
export const GET_HANGANG_TEMP_REQUEST = 'hangang/GET_HANGANG_TEMP_REQUEST';
export const GET_HANGANG_TEMP_SUCCESS = 'hangang/GET_HANGANG_TEMP_SUCCESS';
export const GET_HANGANG_TEMP_FAILURE = 'hangang/GET_HANGANG_TEMP_FAILURE';

// export const add = createAction('todos/ADD', (action) => {
//   // Note: "action" callback does not need "type" parameter
//   return (title: string) => action({ id: cuid(), title, completed: false });
// });
// 액션 생성 함수
// export const getTempHangang = createAction(
//   GET_HANGANG_TEMP_REQUEST,
//   (action) => {
//     // Note: "action" callback does not need "type" parameter
//     return () => action({});
//   }
// );

// export const getUserProfile = createStandardAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createStandardAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>();
// export const getUserProfileError = createStandardAction(GET_USER_PROFILE_ERROR)<AxiosError>();

export const getHangangTempAsync = createAsyncAction(
  GET_HANGANG_TEMP_REQUEST,
  GET_HANGANG_TEMP_SUCCESS,
  GET_HANGANG_TEMP_FAILURE
)<string, HangangTemp, AxiosError>();

// export const getAsyncTodo = asyncAction<string, ITodo, string>(ASYNC_TOGO);
export const initialState: HangangsState = {
  riverTempData: asyncState.initial()
};

const todos = createReducer<HangangsState, HangangsAction>(initialState, {
  [GET_HANGANG_TEMP_SUCCESS]: (state, action) => ({
    ...state,
    riverTempData: asyncState.success(action.payload)
  }),
  [GET_HANGANG_TEMP_FAILURE]: (state, action) => ({
    ...state,
    riverTempData: asyncState.error(action.payload)
  })
});

export default todos;
