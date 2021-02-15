/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//import './App.css';

const { SubMenu } = Menu;
const { Content, Footer } = Layout;

interface Quote {
  NAME: string;
  WORD: string;
}

function DashBoard({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={onCollapse} />
      <Layout>
        <Header onCollapse={onCollapse} collapsed={collapsed} />
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2021 Created by DD^2
        </Footer>
      </Layout>
    </Layout>
  );
}

export default DashBoard;
