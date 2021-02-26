import { HangangTemp } from '../../lib/api/hangang';
import { AsyncState, asyncState } from '../../lib/utils/reducerUtils';
import { createReducer, createAsyncAction, ActionType } from 'typesafe-actions';
import { AxiosError } from 'axios';

export const GET_HANGANG_TEMP_REQUEST = 'HANGANG/GET_HANGANG_TEMP_REQUEST';
export const GET_HANGANG_TEMP_SUCCESS = 'HANGANG/GET_HANGANG_TEMP_SUCCESS';
export const GET_HANGANG_TEMP_FAILURE = 'HANGANG/GET_HANGANG_TEMP_FAILURE';

export const getHangangTempertureAsync = createAsyncAction(
  GET_HANGANG_TEMP_REQUEST,
  GET_HANGANG_TEMP_SUCCESS,
  GET_HANGANG_TEMP_FAILURE
)<string, HangangTemp[], AxiosError>();

const actions = { getHangangTempertureAsync };

// interface IResponse {
//   hangangTemp: HangangTemp[];
// }

// export const getHangangTempAsync = asyncActionCreator(
//   GET_HANGANG_TEMP.REQUEST,
//   GET_HANGANG_TEMP.SUCCESS,
//   GET_HANGANG_TEMP.FAILURE
// )<IRequest, IResponse, IError>();

export type HangangAction = ActionType<typeof actions>;

export type HangangState = {
  riverTempData: AsyncState<HangangTemp[], Error>;
};

const initialState: HangangState = { riverTempData: asyncState.initial() };

const reducer = createReducer<HangangState, HangangAction>(initialState, {
  [GET_HANGANG_TEMP_REQUEST]: (state) => ({
    ...state,
    riverTempData: asyncState.load()
  }),
  [GET_HANGANG_TEMP_SUCCESS]: (state, action) => ({
    ...state,
    riverTempData: asyncState.success(action.payload)
  }),
  [GET_HANGANG_TEMP_FAILURE]: (state, action) => ({
    ...state,
    userProfile: asyncState.error(action.payload)
  })
});

/* handle action 사용  메서드 체이닝 방식 */

//액션 생성
// const GET_HANGANG_TEMP = createAsyncAction('HANGANG/GET_HANGANG_TEMP');
// export const getHangangTemp = createActionEntity<
//   IRequest,
//   HangangTemp[],
//   IError
// >(GET_HANGANG_TEMP);
//const initialState = { riverTempData: [] as HangangTemp[], message: '' };
/* handle action 사용  메서드 체이닝 방식 */
// const reducer = createCustomReducer(initialState, actions)
//   .handleAction(getHangangTemp.success, (state, action) => {
//     return { ...state, riverTempData: action.payload };
//   })
//   .handleAction(getHangangTemp.failure, (state, action) => {
//     return { ...state, message: action.payload.message };
//   });

export default reducer;
