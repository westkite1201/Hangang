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
      //actions.getHangangTemperture.request('')
    );
    //dispatch(actions.getHangangTemperture.request(''));
  };
  
  return {
    hangangState,
    getHangangTemp
  };
}

export default useHangangTemp;
