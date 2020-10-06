import { createAsyncAction } from 'typesafe-actions';
import { HangangTemp } from '../../lib/api/hangang';
import { AxiosError } from 'axios';

// 액션 type
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

export const getHangangTempAsync = createAsyncAction(
  GET_HANGANG_TEMP_REQUEST,
  GET_HANGANG_TEMP_SUCCESS,
  GET_HANGANG_TEMP_FAILURE
)<string, HangangTemp, AxiosError>();
