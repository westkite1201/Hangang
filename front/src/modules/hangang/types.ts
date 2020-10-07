import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { HangangTemp } from '../../lib/api/hangang';
import { AsyncState } from '../../lib/utils/reducerUtils';
export type HangangsAction = ActionType<typeof actions>;

export type HangangsState = {
  riverTempData: AsyncState<HangangTemp, Error>;
};

// export type TAsyncState<P> = {
//   loading: boolean;
//   data: P;
//   error?: any;
// };
// type TAsyncAction = {
//   REQUEST: string;
//   SUCCESS?: string;
//   FAILURE?: string;
// };
// export const asyncActionCreator = (actionName: string): TAsyncAction => {
//   const asyncTypeAction: string[] = ['_REQUEST', '_SUCCESS', '_FAILURE'];
//   return {
//     REQUEST: actionName + asyncTypeAction[0],
//     SUCCESS: actionName + asyncTypeAction[1],
//     FAILURE: actionName + asyncTypeAction[2]
//   };
// };
