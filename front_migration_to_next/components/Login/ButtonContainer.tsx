import React from 'react'
import GoogleButton from './GoogleButton'
import KakaoButton from './KakaoButton'
import NaverButton from './NaverButton'

const ButtonContainer = () => {
    return (
        <div>
            <GoogleButton/>
            <NaverButton/>
            <KakaoButton/>
        </div>
    )
}

export default ButtonContainer