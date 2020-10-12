import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../modules/hangang/reducer';
import rootReducer from '../modules';
export type RootState = ReturnType<typeof rootReducer>;
function useHangangTemp() {
  const dispatch = useDispatch();
  const hangangState = useSelector((store: RootState) => store.hangang);

  const getHangangTemp = () => {
    console.log(
      "getHangangTemp.request('') ",
      actions.getHangangTemp.request('')
    );
    dispatch(actions.getHangangTemp.request(''));
  };
  
  return {
    hangangState,
    getHangangTemp
  };
}

export default useHangangTemp;
