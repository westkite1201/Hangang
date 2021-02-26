import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginComponent = (props) => {
  const { loginSuccess, loginFail } = props;
  
  const googleLoginSuccess = (data) => {
    const { accessToken, googleId } = data;
    const loginData = {
            id: googleId,
            access_token: accessToken
    }
    loginSuccess(loginData, 'GOOGLE');
  }

  const googleLoginFail = (data) => {
    loginFail(data, 'GOOGLE')
  }
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={googleLoginSuccess}
      onFailure={googleLoginFail}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
 