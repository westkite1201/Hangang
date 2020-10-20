import { combineReducers } from 'redux';
import hangang from './hangang';
import quotes from './quotes';
import quotes_ from './quotes_ts'; //ts 용
import toast from './toast';
import auth from './auth';
import { hangangSaga } from './hangang';
import { quotesSaga } from './quotes';
import { quotesSaga_ } from './quotes_ts';
import { authSaga } from './auth';
import { all } from 'redux-saga/effects';
const rootReducer = combineReducers({
  hangang,
  quotes,
  quotes_,
  toast,
  auth
  //note
});

export default rootReducer;

// 루트 리듀서를 만들 때에는 일반 JavaScript 환경에서 /
//할 때랑 방법이 동일한데,
//주의하셔야 되는 부분은 RootState 라는 타입을 만들어서 내보내주어야 한다는 것 입니다./
//타입은 추후 우리가 컨테이너 컴포넌트를 만들게 될 때
// 스토어에서 관리하고 있는 상태를 조회하기 위해서 useSelector를
//사용 할 때 필요로 합니다.
// 루트 사가를 만들어서 내보내주세요.
export function* rootSaga() {
  yield all([hangangSaga(), quotesSaga(), quotesSaga_(), authSaga()]);
}
