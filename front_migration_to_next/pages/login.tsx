import React, { useEffect, useState, useCallback } from 'react';
import {
  AuthWrapper,
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from '../components/Auth';

import LoginButtonContainer from '../components/SnsLogin/ButtonContainer';
import { RootState } from '../store';
import { IUserData } from '../interfaces';
import { getLoginUserDataThunk } from '../lib/slices/loginSlice';

import { useDispatch, useSelector } from 'react-redux';

const Register = ({ handleRegistForm, resist }) => {
  return (
    <AuthContent title="회원가입">
      <InputWithLabel label="이메일" name="email" placeholder="이메일" />
      <InputWithLabel label="아이디" name="username" placeholder="아이디" />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
      />
      <AuthButton onClick={resist}>회원가입</AuthButton>
      <RightAlignedLink onClick={handleRegistForm}>로그인</RightAlignedLink>
    </AuthContent>
  );
};
const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isRegist, setIsRegist] = useState(false);
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.login);

  const onClickLogin = () => {
    dispatch(
      getLoginUserDataThunk({ MEM_EMAIL: email, MEM_PASSWORD: password })
    );
  };
  const enterLogin = useCallback(
    (e) => {
      const disPatchLogin = () => {
        onClickLogin();
      };
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

  const handleRegistForm = () => {
    setIsRegist(!isRegist);
  };
  const resist = () => {
    //회원가입
  };
  return (
    <div>
      <AuthWrapper>
        {isRegist ? (
          <Register
            handleRegistForm={handleRegistForm}
            resist={resist}
          ></Register>
        ) : (
          <>
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
              <RightAlignedLink onClick={handleRegistForm}>
                회원가입
              </RightAlignedLink>
            </AuthContent>
            <LoginButtonContainer />
          </>
        )}
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
