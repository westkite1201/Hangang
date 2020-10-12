import { createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { HangangTemp } from '../../lib/api/hangang';

export const GET_HANGANG_TEMP_REQUEST = 'HANGANG/GET_HANGANG_TEMP_REQUEST';

export const GET_HANGANG_TEMP = {
  REQUEST: 'HANGANG/GET_HANGANG_TEMP_REQUEST',
  SUCCESS: 'HANGANG/GET_HANGANG_TEMP_SUCCESS',
  FAILURE: 'HANGANG/GET_HANGANG_TEMP_FAILURE'
};

interface IRequest {}
interface IResponse {
  hangangTemp: HangangTemp[];
}
interface IError {
  message: string;
}
export const getHangangTempAsync = createAsyncAction(
  GET_HANGANG_TEMP.REQUEST,
  GET_HANGANG_TEMP.SUCCESS,
  GET_HANGANG_TEMP.FAILURE
)<IRequest, IResponse, IError>();

const actions = {
  getHangangTempAsync
};
type Actions = ActionType<typeof actions>;
type State = { riverTempData: HangangTemp[]; message: string };

const initialState: State = { riverTempData: [], message: '' };

const reducer = createReducer<State, Actions>(initialState)
  .handleAction(getHangangTempAsync.success, (state, action) => {
    return { ...state, riverTempData: action.payload.hangangTemp };
  })
  .handleAction(getHangangTempAsync.failure, (state, action) => {
    return { ...state, message: action.payload.message };
  })
  .handleAction(getHangangTempAsync.request, (state) => {
    return { ...state };
  });

// export const getHangangTempAsync = createAsyncAction(
//   GET_HANGANG_TEMP_REQUEST,
//   GET_HANGANG_TEMP_SUCCESS,
//   GET_HANGANG_TEMP_FAILURE
// )<string, HangangTempRes, AxiosError>();

// // export const getAsyncTodo = asyncAction<string, ITodo, string>(ASYNC_TOGO);
// export const initialState: HangangState = {
//   riverTempData: asyncState.initial()
// };

// const todos = createReducer<HangangState, HangangsAction>(initialState, {
//   [GET_HANGANG_TEMP_SUCCESS]: (state, action) => ({}),
//   [GET_HANGANG_TEMP_FAILURE]: (state, action) => ({
//     ...state,
//     riverTempData: asyncState.error(action.payload)
//   })
// });

export default reducer;
