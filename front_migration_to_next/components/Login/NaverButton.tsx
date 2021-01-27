import React, {useEffect} from 'react'

declare global {
    interface Window {
        naver: any
    }
}

type NaverBtnProps = {
    clientId: string,
    callbackUrl: string
  };

const NaverButton = ({ clientId, callbackUrl }: NaverBtnProps) => {
    useEffect(() => {
        Naver()
    }, [])
    
    const Naver = () => {
        const { naver } = window
        const naverLogin = new naver.LoginWithNaverId(
            {
                clientId: clientId,
                callbackUrl: callbackUrl,
                callbackHandle: true,
                loginButton: {
                    color: 'green',
                    type: 1,
                    height: 100
                }
            }
        )

        naverLogin.init()
    }

    return (
        <div id='naverIdLogin'>
            
        </div>
    )
    // D0CsChNrt0YRFNdIhg3F // clientId
}

NaverButton.defaultProps = {
    clientId: 'D0CsChNrt0YRFNdIhg3F',
    callbackUrl: 'http://10.13.4.4:3030/login?success=true'
}

export default NaverButton