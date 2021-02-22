/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import styled from 'styled-components';
//import './App.css';

const { SubMenu } = Menu;
const { Content, Footer } = Layout;

interface Quote {
  NAME: string;
  WORD: string;
}
const St = {
  Layout: styled.section`
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: ${({ theme }) => theme.mode.mainBackground};
  `,
  Footer: styled.div`
    background: ${({ theme }) => theme.mode.mainBackground};
    padding: 24px 50px;
    color: ${({ theme }) => theme.mode.primaryText};
    font-size: 14px;

    flex: 0 0 auto;
    textalign: center;
  `
};
function DashBoard({ children, themeMode }) {
  console.log('themeMode', themeMode);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Roboto' }}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={onCollapse}
        themeMode={themeMode}
      />
      <St.Layout>
        <Header onCollapse={onCollapse} collapsed={collapsed} />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <St.Footer>© 2021 Design by DD^2</St.Footer>
      </St.Layout>
    </Layout>
  );
}

export default DashBoard;
