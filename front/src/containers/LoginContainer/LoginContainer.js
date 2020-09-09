import React, { useEffect, useState } from 'react';
import KakaoLoginComponent from '../../component/KakaoLoginComponent';
import GoogleLoginComponent from '../../component/GoogleLoginComponent';
function LoginContainer() {
  const loginSuccess = (data) => {
    console.log('login success: ', data);
  };

  const loginFail = (data) => {
    console.log('login fail: ', data);
  };

  return (
    <div>
      <KakaoLoginComponent loginSuccess={loginSuccess} loginFail={loginFail} />
      <GoogleLoginComponent loginSuccess={loginSuccess} loginFail={loginFail} />
    </div>
  );
}

export default LoginContainer;
