import { useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { AccountBookOutlined } from '@ant-design/icons';
import { Items } from './MenuItems';
import styled from 'styled-components';
import Link from 'next/link';
const St = {
  BrandWrapper: styled.div`
    z-index: 1;
    height: 64px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0 24px;
    box-shadow: 0 1px 9px -3px rgb(0 0 0 / 20%);
  `,
  BrandLogoWrapper: styled.div`
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    img {
      width: 36px;
      margin-right: 8px;
    }
    h1 {
      vertical-align: text-bottom;
      font-size: 16px;
      text-transform: uppercase;
      display: inline-block;
      font-weight: 700;
      color: #1890ff;
      white-space: nowrap;
      margin-bottom: 0;
      background-image: -webkit-gradient(
        linear,
        37.219838% 34.532506%,
        36.425669% 93.178216%,
        from(#29cdff),
        to(#0a60ff),
        color-stop(0.37, #148eff)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `
};
const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse, themeMode }) => {
  console.log('Sidebar ', themeMode);
  useEffect(() => {
    return;
  }, [themeMode]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme={themeMode}
    >
      <St.BrandWrapper>
        <St.BrandLogoWrapper>
          <img alt="logo" src="/images/river-icon-png-15.jpg" />
          {!collapsed && <h1>Hangang Admin</h1>}
        </St.BrandLogoWrapper>
      </St.BrandWrapper>

      <Menu theme={themeMode} defaultSelectedKeys={['1']} mode="inline">
        {Items.map((item, index) => {
          if (item.children) {
            return (
              <SubMenu
                key={'sub-title-' + index}
                title={
                  <span>
                    <AccountBookOutlined type="user" />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {item.children.map((item, index) => {
                  return (
                    <Menu.Item key={'sub-menu-' + index}>
                      {item.title}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={'menu-title-' + index}>
                <AccountBookOutlined type="pie-chart" />
                <Link href={item.link.href}>{item.title && item.title}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};
export default Sidebar;
