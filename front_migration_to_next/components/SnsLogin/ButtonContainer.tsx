import React, { useEffect, useState } from 'react';
import KakaoButton from './KakaoButton';
import NaverButton from './NaverButton';

import { getSnsLoginUserDataThunk } from '../../lib/slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const ButtonContainer = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.login);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (userData.isLogin) {
      window.location.href = window.location.origin;
    }
  }, [userData]);

  const snsLoginSuccess = (accessToken) => {
    dispatch(
      getSnsLoginUserDataThunk({ ACCESS_TOKEN: accessToken, SNS_TYPE: 'KAKAO' })
    );
  };

  return (
    <div>
      {/* <NaverButton snsLoginSuccess={snsLoginSuccess} /> */}
      <KakaoButton snsLoginSuccess={snsLoginSuccess} />
    </div>
  );
};

export default ButtonContainer;
