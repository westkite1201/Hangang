import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';

function KakaoLoginComponent(props) {
    const { loginSuccess, loginFail } = props;
    useEffect(() => {
        
    }, []); 

    const kakaoLoginSuccess = (data) => {
        const { profile, response } = data
        const loginData = {
            id: profile.id,
            access_token: response.access_token
        }
        loginSuccess(loginData, 'KAKAO');
    }
    const kakaoLoginFail = (data) => {
        loginFail(data, 'KAKAO')
    }
    return(
        <div>
            <KaKaoBtn
                jsKey={process.env.KAKAO_JAVASCRIPT_KEY}
                buttonText="카카오톡로그인"
                onSuccess={kakaoLoginSuccess}
                onFailure={kakaoLoginFail}
                getProfile={true}
            />
        </div>
    )
}

const StKaKaoLogin = styled.div`
    cursor: pointer;
    /* border-radius:10px; */
    /* width: 200px; */
    /* &:hover{
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
    } */
`;

const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`

export default KakaoLoginComponent;