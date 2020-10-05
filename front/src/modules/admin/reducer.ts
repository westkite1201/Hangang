import { TodosState, TodosAction } from './types';
import {
  // REMOVE_TODO,
  // TOGGLE_TODO,
  // ADD_TODO,
  GET_USER_TODO,
  GET_USER_TODO_SUCCESS,
  GET_USER_TODO_ERROR
} from './actions';
import { createReducer } from 'typesafe-actions';
import {
  asyncState
  //createAsyncReducer,
  //transformToArray,
} from '../../lib/utils/reducerUtils';
import produce from 'immer';

// 초깃값 설정
const initialState: TodosState = {
  userTodos: asyncState.initial()
};
//draft 사용
// const todos = createReducer<TodosState, TodosAction>(initialState, {
//   [ADD_TODO]: (state, { payload: text }) =>
//     produce(state, draft => {
//       draft.push({
//         id: Math.max(...state.map(todo => todo.id)) + 1,
//         text,
//         done: false
//       });
//     }),
//   [TOGGLE_TODO]: (state, { payload: id }) =>
//     state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
//   [REMOVE_TODO]: (state, { payload: id }) =>
//     state.filter(todo => todo.id !== id)
// });

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, { payload: text }) =>
    produce(state, (draft) => {
      draft.push({
        id: Math.max(...state.map((todo) => todo.id)) + 1,
        text,
        done: false
      });
    }),
  // [TOGGLE_TODO]: (state, { payload: id }) =>
  //   state.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  // [REMOVE_TODO]: (state, { payload: id }) =>
  //   state.filter(todo => todo.id !== id)

  [GET_USER_TODO]: (state) => ({
    ...state,
    userTodos: asyncState.load()
  }),
  [GET_USER_TODO_SUCCESS]: (state, action) => ({
    ...state,
    userTodos: asyncState.success(action.payload)
  }),
  [GET_USER_TODO_ERROR]: (state, action) => ({
    ...state,
    userTodos: asyncState.error(action.payload)
  })

  // [ADD_TODO]: (state, { payload: text }) =>
  //   state.concat({
  //     id: Math.max(...state.map((todo) => todo.id)) + 1,
  //     text,
  //     done: false
  //   }),
  // [TOGGLE_TODO]: (state, { payload: id }) =>
  //   state.map((todo) =>
  //     todo.id === id ? { ...todo, done: !todo.done } : todo
  //   ),
  // [REMOVE_TODO]: (state, { payload: id }) =>
  //   state.filter((todo) => todo.id !== id)
});

export default todos;
