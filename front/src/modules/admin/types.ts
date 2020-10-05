import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { HangangTemp } from '../../lib/api/hangang';
import { AsyncState } from '../../lib/utils/reducerUtils';
export type TodosAction = ActionType<typeof actions>;

export type HangangState = {
  userTodos: AsyncState<HangangTemp, Error>;
};
