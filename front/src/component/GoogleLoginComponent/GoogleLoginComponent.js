import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginComponent = (props) => {
  const { loginSuccess, loginFail } = props;
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={loginSuccess}
      onFailure={loginFail}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
 