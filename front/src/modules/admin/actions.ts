import {
  createAction,
  createAsyncAction,
} from 'typesafe-actions';
import { UserTodo } from '../../lib/api/todo';
import { AxiosError } from 'axios';
// 액션 type
export const ADD_TODO = 'todos/ADD_TODO';
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

export const GET_USER_TODO = 'todos/GET_USER_TODO';
export const GET_USER_TODO_SUCCESS =
  'todos/GET_USER_TODO_SUCCESS';
export const GET_USER_TODO_ERROR =
  'todos/GET_USER_TODO_ERROR';

// 액션 생성 함수
export const addTodo = createAction(ADD_TODO)<string>();
export const toggleTodo = createAction(TOGGLE_TODO)<
  number
>();
export const removeTodo = createAction(REMOVE_TODO)<
  number
>();

export const getUserTodosAsync = createAsyncAction(
  GET_USER_TODO,
  GET_USER_TODO_SUCCESS,
  GET_USER_TODO_ERROR,
)<number, UserTodo, AxiosError>();
