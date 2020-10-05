import { createAction, createAsyncAction } from 'typesafe-actions';
import { HangangTempRes, HangangTemp } from '../../lib/api/hangang';
import { AxiosError } from 'axios';
// 액션 type
export const ADD_TODO = 'todos/ADD_TODO';

export const GET_HANGANG_TEMP_REQUEST = 'hangang/GET_HANGANG_TEMP_REQUEST';
export const GET_HANGANG_TEMP_SUCCESS = 'hangang/GET_HANGANG_TEMP_SUCCESS';
export const GET_HANGANG_TEMP_FAILURE = 'hangang/GET_HANGANG_TEMP_FAILURE';

// export const add = (title: string) =>
//   action('todos/ADD', { id: cuid(), title, completed: false });
// // add: (title: string) => { type: "todos/ADD"; payload: { id: string, title: string, completed: boolean; }; }

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

// export const getUserTodosAsync = createAsyncAction(
//   GET_USER_TODO,
//   GET_USER_TODO_SUCCESS,
//   GET_USER_TODO_ERROR
// )<number, HangangTempRes, AxiosError>();

export const getHangangTempAsync = createAsyncAction(
  GET_HANGANG_TEMP_REQUEST,
  GET_HANGANG_TEMP_SUCCESS,
  GET_HANGANG_TEMP_FAILURE
)<string, HangangTemp, AxiosError>();
