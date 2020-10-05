import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { 
    LOGOUT_REQUEST
} from '../../modules/auth/reducer';

const ButtonContainer: React.FC<RouteComponentProps> = (props) => {
        // variable part
        const dispatch = useDispatch();
        const { memberInfo: {isLogin, token} } = useSelector((state) => state.auth)
        const { history } = props;
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
                case 'login':   // 로그인 페이지 요청
                    history.push('/login');
                    break;
                case 'logout':  // 로그아웃 요청
                    dispatch({
                        type: LOGOUT_REQUEST
                    });
                    break;
                default:
                    break;
            }
            // setUserLogin(!userLogin)
        }
        
        // render part
        const afterLogin = () => {
            return (
                <button onClick={() => callButton('logout')}>
                    로그아웃
                </button>
            )
        }
        const afterLogout = () => {
            return(
                <button onClick={() => callButton('login')}>
                    로그인
                </button>
            )
        }
        return(
            <ButtonWrapper>
                {buttonView}
            </ButtonWrapper>
        )
    }

const ButtonWrapper = styled.div`
    top: 2px;
`
export default ButtonContainer;