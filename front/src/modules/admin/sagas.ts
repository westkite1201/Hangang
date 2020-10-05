import { getUserTodosAsync, GET_USER_TODO } from './actions';

import { getUserTodo, UserTodo } from '../../lib/api/todo';
import { put, call, takeEvery } from 'redux-saga/effects';
//import createAsyncSaga from '../../lib/utils/createAsyncSaga';

function* getUserTodoSaga(
  action: ReturnType<typeof getUserTodosAsync.request>
) {
  try {
    console.log('getUserTodoSaga', action.payload);
    const userTodo: UserTodo = yield call(getUserTodo, action.payload);
    console.log('userTodo ', userTodo);
    yield put(getUserTodosAsync.success(userTodo));
  } catch (e) {
    yield put(getUserTodosAsync.failure(e));
  }
}

export function* todoSaga() {
  yield takeEvery(GET_USER_TODO, getUserTodoSaga);
}

/*  리펙토링 버전  */
// const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, getUserProfile);

// export function* githubSaga() {
//   yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
// }
