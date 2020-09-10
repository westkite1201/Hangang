import React, { useEffect, useState } from 'react';
import KakaoLoginComponent from '../../component/KakaoLoginComponent';
import GoogleLoginComponent from '../../component/GoogleLoginComponent';
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from '../../component/Auth';
function LoginContainer() {
  const loginSuccess = (data) => {
    console.log('login success: ', data);
  };

  const loginFail = (data) => {
    console.log('login fail: ', data);
  };

  return (
    <div>
      <KakaoLoginComponent />
      <GoogleLoginComponent loginSuccess={loginSuccess} loginFail={loginFail} />
      <AuthContent title="로그인">
        <InputWithLabel label="이메일" name="email" placeholder="이메일" />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <AuthButton>로그인</AuthButton>
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    </div>
  );
}

export default LoginContainer;
