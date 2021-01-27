import React from 'react'
import KakaoBtn from 'react-kakao-login'

type KakaoBtnProps = {
    token: string
  };

const KakaoButton = ({token}: KakaoBtnProps) => {
    return (
        <KakaoBtn
            token={token}
            onSuccess={(response) => {
                console.log('success')
                console.log(response)
            }}
            onFail = {(error) => {
                console.error(error)
                console.log('token: ', token)
            }}
            onLogout = {() => console.log('logout')}
        />

    )
}

KakaoButton.defaultProps = {
    token: 'cde71b461432f766baac62eabee07227'
}

export default KakaoButton