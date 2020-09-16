import React, { useEffect, useState, useCallback } from 'react';
import KakaoLoginComponent from '../../component/KakaoLoginComponent';
import GoogleLoginComponent from '../../component/GoogleLoginComponent';
import { LOGIN_REQUEST, SNS_LOGIN_REQUEST } from '../../modules/auth/reducer';
import {
  AuthWrapper,
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from '../../component/Auth';
import { useSelector, useDispatch } from 'react-redux';

function LoginContainer({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const { memberInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (memberInfo.isLogin) {
      history.push('/');
    }
  }, [memberInfo, history]);

  const onClickLogin = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        memEmail: email,
        memPassword: password
      }
    });
  };
  const enterLogin = useCallback(
    (e) => {
      const disPatchLogin = () => {
        dispatch({
          type: LOGIN_REQUEST,
          payload: {
            memEmail: email,
            memPassword: password
          }
        });
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

  const snsLoginSuccess = (data, type) => {
    dispatch({
      type: SNS_LOGIN_REQUEST,
      payload: {
        id: data.id,
        accessToken: data.access_token,
        sns_type: type
      }
    });
  };

  const snsLoginFail = (data, type) => {
    console.log('login fail: ', data);
    console.log('login fail: ', type);
  };

  const handlePassword = (e) => {
    console.log('hell', password);
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    console.log('hell', email);
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
        <KakaoLoginComponent loginSuccess={snsLoginSuccess} loginFail={snsLoginFail} />
        <GoogleLoginComponent loginSuccess={snsLoginSuccess} loginFail={snsLoginFail} />
      </AuthWrapper>
    </div>
  );
}

export default LoginContainer;
