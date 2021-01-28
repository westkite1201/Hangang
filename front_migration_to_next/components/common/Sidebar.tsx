import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { css } from '../../styles/themed-components';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
const Sidebar = () => {
  //Nav컴포넌트
  const [sideMenu, setSideMenu] = useState(null);
  const showSideMenu = () => {
    setSideMenu(true);
  };
  const hideSideMenu = () => {
    setSideMenu(false);
  };

  return (
    <div>
      {!sideMenu && (
        <div
          style={{
            color: 'black',
            position: 'absolute',
            zIndex: 120,
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={showSideMenu}
        >
          <MenuIcon onClick={showSideMenu} style={{ fontSize: '2rem' }} />
        </div>
      )}

      <SideNav sideMenu={sideMenu} hideSideMenu={hideSideMenu} />
    </div>
  );
};

//SideNav 컴포넌트
function SideNav({ sideMenu, hideSideMenu }) {
  return (
    <div>
      <St.SidebarWrapper
        sideMenu={sideMenu}
        onClick={hideSideMenu}
      ></St.SidebarWrapper>
      <St.SideMenuContainer sideMenu={sideMenu}>
        <St.MenuContents>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/quote">QUOTES</Link>
            </li>
            <li>
              <Link href="/login">Login Page</Link>
            </li>
          </ul>
        </St.MenuContents>
      </St.SideMenuContainer>
    </div>
  );
}
export default Sidebar;

const St = {
  AppbarWrapper: styled.div`
    color: black;
    background-color: rgba(0, 0, 0, 0);
  `,

  SidebarWrapper: styled.div`
    position: fixed;
    display: ${(props) => !props.sideMenu && 'none'};
    z-index: ${(props) => (props.sideMenu ? 100 : 0)};
    width: 100%;
    height: 100%;
    background: ${(props) => (props.sideMenu ? 'rgba(0, 0, 0, 0.3)' : 'none')};
    opacity: 1;
    transition: opacity 0.3s ease 0s;
  `,
  // const SideMenuBackground = styled.div`
  //   display: ${(props) => (props.sideMenu ? 'block' : 'none')};
  // `; // 삼항연산자를 사용해 전달받은 sideMenu의 state에 따라서 렌더링

  SideMenuContainer: styled.div`
    background: black;
    position: fixed;
    right: inherit;
    z-index: 110;
    width: 300px;
    height: 100%;
    transition: all 0.5s ease 0s;
    transform: ${(props) => props.sideMenu === null && 'translate(-100%, 0)'};
    ${(props) =>
      props.sideMenu !== null &&
      css`
        animation: 0.7s ${(props) => (props.sideMenu ? 'showUp' : 'showOut')}
          forwards;
      `};
    @keyframes showUp {
      0% {
        transform: translate(-100%, 0);
      }

      100% {
        transform: translate(0, 0);
      }
    }

    @keyframes showOut {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(-100%, 0);
        display: none;
      }
    }
  `,
  MenuContents: styled.div`
    color: white;
    padding: 50px;
    font-size: 1.5rem;
  `,
};
