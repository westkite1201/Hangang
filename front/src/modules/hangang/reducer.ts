import { HangangTemp, IRequest, IError } from '../../lib/api/hangang';
import {
  createAsyncAction,
  createActionEntity,
  createCustomReducer
} from '../../lib/utils/reducerUtils';
export const GET_HANGANG_TEMP_REQUEST = 'HANGANG/GET_HANGANG_TEMP_REQUEST';
// export const GET_HANGANG_TEMP = {
//   REQUEST: 'HANGANG/GET_HANGANG_TEMP_REQUEST',
//   SUCCESS: 'HANGANG/GET_HANGANG_TEMP_SUCCESS',
//   FAILURE: 'HANGANG/GET_HANGANG_TEMP_FAILURE'
// };

// interface IResponse {
//   hangangTemp: HangangTemp[];
// }

// export const getHangangTempAsync = asyncActionCreator(
//   GET_HANGANG_TEMP.REQUEST,
//   GET_HANGANG_TEMP.SUCCESS,
//   GET_HANGANG_TEMP.FAILURE
// )<IRequest, IResponse, IError>();

//액션 생성
const GET_HANGANG_TEMP = createAsyncAction('HANGANG/GET_HANGANG_TEMP');
export const getHangangTemp = createActionEntity<
  IRequest,
  HangangTemp[],
  IError
>(GET_HANGANG_TEMP);

// const actions = {
//   getHangangTempAsync
// };
// type Actions = ActionType<typeof actions>;
// type State = { riverTempData: HangangTemp[]; message: string };

const actions = { getHangangTemp };
const initialState = { riverTempData: [] as HangangTemp[], message: '' };

const reducer = createCustomReducer(initialState, actions)
  .handleAction(getHangangTemp.success, (state, action) => {
    return { ...state, riverTempData: action.payload };
  })
  .handleAction(getHangangTemp.failure, (state, action) => {
    return { ...state, message: action.payload.message };
  });
// .handleAction(getHangangTemp.request, (state) => {
//   return { ...state };
// });

export default reducer;
