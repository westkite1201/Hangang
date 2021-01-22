import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { css } from "../../styles/themed-components";
const Sidebar = () => {
  //Nav컴포넌트
  const [sideMenu, setsideMenu] = useState(true); //추후 구현할 sidebar 상태 초기화(null로 설정한 이유 아래에서 설명)

  const showSideMenu = () => {
    setsideMenu(!sideMenu);
    //document.body.style.overflow = "hidden";
  };

  const hideSideMenu = (props) => {
    setsideMenu(false);
    //document.body.style.overflow = "unset";
  };
  return (
    <div>
      <div style={{ color: "white" }} onClick={showSideMenu}>
        =
      </div>
      <SideNav sideMenu={sideMenu} hideSideMenu={hideSideMenu} />;
    </div>
  );
};

//SideNav 컴포넌트
function SideNav({ sideMenu, hideSideMenu }) {
  console.log("sidemeNUE", sideMenu);
  return (
    <div>
      <SidebarWrapper onClick={hideSideMenu}></SidebarWrapper>
      <SideMenuBackground sideMenu={sideMenu} onClick={hideSideMenu} />
      <SideMenuContainer sideMenu={sideMenu}>
        <MenuContents>
          <div onClick={hideSideMenu} className="closeBtn">
            X
          </div>
        </MenuContents>
      </SideMenuContainer>
    </div>
  );
}

//SideNav styled component
const SidebarWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
  transition: opacity 0.3s ease 0s;
`;
const SideMenuBackground = styled.div`
  display: ${(props) => (props.sideMenu ? "block" : "none")};
`; // 삼항연산자를 사용해 전달받은 sideMenu의 state에 따라서 렌더링

const SideMenuContainer = styled.div`
  background: black;
  position: fixed;
  right: inherit;
  z-index: 1100;
  width: 300px;
  height: 100%;
  transition: all 0.5s ease 0s;
  ${(props) =>
    props.sideMenu !== null &&
    css`
      animation: 0.7s ${(props) => (props.sideMenu ? "showUp" : "showOut")}
        forwards;
    `}
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
`;
const MenuContents = styled.div``;
export default Sidebar;
