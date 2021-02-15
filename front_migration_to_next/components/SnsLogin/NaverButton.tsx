import React, { useEffect } from 'react';
declare global {
  interface Window {
    naver: any;
  }
}

type NaverBtnProps = {
  clientId: string;
  callbackUrl: string;
};

const NaverButton = ({ clientId, callbackUrl }: NaverBtnProps) => {
  useEffect(() => {
    NaverLogin();
  }, []);

  const NaverLogin = () => {
    const {
      naver: { LoginWithNaverId }
    } = window;
    const naverLogin = new LoginWithNaverId({
      clientId: clientId,
      callbackUrl: callbackUrl,
      isPopup: false,
      callbackHandle: true,
      loginButton: {
        color: 'green',
        type: 1,
        height: 100
      }
    });

    naverLogin.init();

    naverLogin.getLoginStatus(function (status) {
      console.log(status);
      if (status) {
        console.log(naverLogin.user);
      } else {
        console.log('AccessToken이 올바르지 않습니다.');
      }
    });
  };

  const naverLogout = async () => {
    const {
      naver: { logout }
    } = window;

    const accessToken = '';
    const url =
      'https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=D0CsChNrt0YRFNdIhg3F&client_secret=iU8KrijzIn&access_token=AAAAOJ14MQi0w59cRzT7VsRzKt10CU7xSplydw6MPqq37NBUKx3Xw1JUoKbKWavsG1m1MvCDTJmUzjH0RUX6OLT6iV4&service_provider=NAVER';

    const res = await fetch(url);
    console.log(res);
  };

  return (
    <div>
      <button id="naverIdLogin" onClick={NaverLogin}></button>
    </div>
  );
};

NaverButton.defaultProps = {
  clientId: 'D0CsChNrt0YRFNdIhg3F',
  callbackUrl: 'http://10.13.4.4:3030/login'
};

export default NaverButton;
