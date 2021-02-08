import React, { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

type KakaoBtnProps = {
  token: string;
};

const KakaoButton = ({ token }: KakaoBtnProps) => {
  useEffect(() => {
    KakaoInit();
  }, []);

  const KakaoInit = () => {
    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      // application init 정상적으로 진행되었는지 확인
      Kakao.init(token); // 카카오 로그인과 관련한 application 정보 init(token 발급 후 사용필요)
    }
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: (response) => {
        Kakao.Auth.setAccessToken(response.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success: (apiResponse) => {
            console.log('사용자 정보: ', apiResponse);
          },
          fail: (apiError) => {
            console.error(apiError);
            console.log('apiError');
          }
        });
      },
      fail: (error) => {
        console.error(error);
        console.log('fail error');
      }
    });
  };

  const logout = () => {
    const { Kakao } = window;
    console.log(Kakao.Auth.getAccessToken());
    const accessToken = Kakao.Auth.getAccessToken();

    if (accessToken) {
      Kakao.Auth.logout((response) => {
        if (response) {
          Kakao.Auth.setAccessToken(null);
          console.log('logout success');
        }
      });
    }
  };

  return (
    <div>
      <a id="kakao-login-btn"></a>
      <button onClick={logout}>카카오톡 로그아웃</button>
    </div>
  );
};

KakaoButton.defaultProps = {
  token: 'cde71b461432f766baac62eabee07227'
};

export default KakaoButton;
