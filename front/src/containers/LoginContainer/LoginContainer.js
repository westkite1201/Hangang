import React, { useEffect, useState } from 'react';
import KakaoLoginComponent from '../../component/KakaoLoginComponent';

function LoginContainer() {
    const loginSuccess = (data) => {
        console.log('login success: ', data);
    }

    const loginFail = (data) => {
        console.log('login fail: ', data);
    }

    return(
        <div>
            <KakaoLoginComponent
                loginSuccess={loginSuccess}
                loginFail={loginFail}
            />
        </div>
    )
}

export default LoginContainer;