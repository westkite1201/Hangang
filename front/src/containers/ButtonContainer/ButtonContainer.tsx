import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { 
    LOGOUT_REQUEST
} from '../../modules/auth/reducer';

const ButtonContainer: React.FunctionComponent = () => {
        // variable part
        const dispatch = useDispatch();
        const { memberInfo: {isLogin, token} } = useSelector((state) => state.auth)
        const [userLogin, setUserLogin] = useState<boolean>(false);
        const [buttonView, setButtonView] = useState<JSX.Element>();
        
        // life cycle part
        useEffect(() => {       // 유저의 Login 상태에 따라서 buttonView 변경
            if (userLogin) {
                setButtonView(afterLogin)
            } else {
                setButtonView(afterLogout)
            }
        }, [userLogin]);
    
        useEffect(() => { // 초기 진입 시 사용자 로그인요청 redux로부터 확인
            setUserLogin(isLogin);
        }, [isLogin]);
    
        // private function part
        const callButton = (callType) => {
            console.log(callType);
            switch (callType) {
                case 'login':   // 로그인 요청
    
                    break;
                case 'logout':  // 로그아웃 요청
                    dispatch({
                        type: LOGOUT_REQUEST
                    });
                    break;
                case 'regist':  // 회원가입 요청
                    break;
                default:
                    break;
            }
            // setUserLogin(!userLogin)
        }
        
        // render part
        const afterLogin = () => {
            return (
                <Fragment>
                    <button onClick={() => callButton('logout')}>
                        로그아웃
                    </button>
                </Fragment>
            )
        }
        const afterLogout = () => {
            return(
                <Fragment>
                    <button onClick={() => callButton('login')}>로그인</button>
                    <button onClick={() => callButton('regist')}>회원가입</button>
                </Fragment>
            )
        }
        return(
            <Fragment>
                {buttonView}
            </Fragment>
        )
    }

export default ButtonContainer;