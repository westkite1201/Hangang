import React, { useEffect, useState, useCallback } from 'react';
import KakaoLoginComponent from '../../component/KakaoLoginComponent';
import GoogleLoginComponent from '../../component/GoogleLoginComponent';
import { LOGIN_REQUEST } from '../../modules/auth/reducer';
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from '../../component/Auth';
import { useSelector, useDispatch } from 'react-redux';

function LoginContainer({ history }) {
  const dispatch = useDispatch();
  const { memberInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (memberInfo.isLogin) {
      history.push('/');
    }
  }, [memberInfo, history]);

  const enterLogin = useCallback((e) => {
    //console.log('enter  Login ee', enterLogin);
    if (e.keyCode === 13) {
      onClickLogin();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', enterLogin);
    return () => {
      window.removeEventListener('keydown', enterLogin);
    };
  }, [enterLogin]);

  const loginSuccess = (data) => {
    console.log('login success: ', data);
  };

  const loginFail = (data) => {
    console.log('login fail: ', data);
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlePassword = (e) => {
    console.log('hell', password);
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    console.log('hell', email);
    setEmail(e.target.value);
  };
  const onClickLogin = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        memEmail: email,
        memPassword: password
      }
    });
  };

  return (
    <div>
      <KakaoLoginComponent loginSuccess={loginSuccess} loginFail={loginFail} />
      <GoogleLoginComponent loginSuccess={loginSuccess} loginFail={loginFail} />
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
    </div>
  );
}

export default LoginContainer;
