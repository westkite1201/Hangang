import React, { useEffect, useState, useCallback } from 'react';
import {
  AuthWrapper,
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from '../components/Auth';

import { useDispatch } from 'react-redux';
const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  // const { memberInfo } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     if (memberInfo.isLogin) {
  //       history.push('/');
  //     }
  //   }, [memberInfo, history]);

  const onClickLogin = () => {
    // dispatch({
    //   type: LOGIN_REQUEST,
    //   payload: {
    //     memEmail: email,
    //     memPassword: password
    //   }
    // });
  };
  const enterLogin = useCallback(
    (e) => {
      const disPatchLogin = () => {
        // dispatch({
        //   type: LOGIN_REQUEST,
        //   payload: {
        //     memEmail: email,
        //     memPassword: password
        //   }
        // });
      };
      //console.log('enter  Login ee', enterLogin);
      if (e.keyCode === 13) {
        disPatchLogin();
      }
    },
    [dispatch, email, password]
  );

  useEffect(() => {
    window.addEventListener('keydown', enterLogin);
    return () => {
      window.removeEventListener('keydown', enterLogin);
    };
  }, [enterLogin]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <AuthWrapper>
        <AuthContent title="로그인">
          <InputWithLabel
            label="이메일"
            name="email"
            placeholder="이메일"
            onChange={handleEmail}
          />
          <InputWithLabel
            label="비밀번호"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={handlePassword}
          />
          <AuthButton onClick={onClickLogin}>로그인</AuthButton>
          <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
        </AuthContent>
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
