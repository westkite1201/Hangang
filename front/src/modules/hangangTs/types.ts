import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { HangangTemp } from '../../lib/api/hangang';
import { AsyncState } from '../../lib/utils/reducerUtils';
export type HangangsAction = ActionType<typeof actions>;

export type HangangsState = {
  riverTempData: AsyncState<HangangTemp, Error>;
};
export type TAsyncState<P> = {
  loading: boolean;
  data: P;
  error?: any;
};
