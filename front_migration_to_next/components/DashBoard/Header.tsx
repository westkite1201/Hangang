import React, { Fragment } from 'react';
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd';

import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

import moment from 'moment';
import styled from 'styled-components';
const { SubMenu } = Menu;
const { Header } = Layout;

const St = {
  HeaderWrapper: styled.div`
    #layoutHeader {
      padding: 0;
      box-shadow: 4px 4px 40px 0 rgb(0 0 0 / 5%);
      position: relative;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      height: 64px;
      z-index: 9;
      -ms-flex-align: center;
      align-items: center;
      background: ${({ theme }) => theme.mode.mainBackground};
    }
  `,
  CollapsedButton: styled.div`
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease-out;
  `
};
const CustomHeader = ({ collapsed, onCollapse }) => {
  const handleClickMenu = (e) => {
    // e.key === 'SignOut' && this.props.onSignOut();
  };
  const username = '';
  const avatar = '';
  const rightContent = [
    <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: '#999', marginRight: 4 }}>
              <>Hi,</>
            </span>
            <span>{username}</span>
            <Avatar style={{ marginLeft: 8 }} src={avatar} />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut">
          <>Sign out</>
        </Menu.Item>
      </SubMenu>
    </Menu>
  ];

  if (false) {
    /*
    const { languages } = config.i18n;
    const currentLanguage = languages.find(
      (item) => item.key === i18n._language
    );

    rightContent.unshift(
      <Menu
        key="language"
        selectedKeys={[currentLanguage.key]}
        onClick={(data) => {
          setLocale(data.key);
        }}
        mode="horizontal"
      >
        <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
          {languages.map((item) => (
            <Menu.Item key={item.key}>
              <Avatar size="small" style={{ marginRight: 8 }} src={item.flag} />
              {item.title}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    );
          */
  }

  rightContent.unshift(/*
    <Popover
      placement="bottomRight"
      trigger="click"
      key="notifications"
      overlayClassName={styles.notificationPopover}
      getPopupContainer={() => document.querySelector('#primaryLayout')}
      content={
        <div className={styles.notification}>
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            locale={{
              emptyText: <>You have viewed all notifications.</>
            }}
            renderItem={(item) => (
              <List.Item className={styles.notificationItem}>
                <List.Item.Meta
                  title={<>{item.title}</>}
                  description={moment(item.date).fromNow()}
                />
                <RightOutlined style={{ fontSize: 10, color: '#ccc' }} />
              </List.Item>
            )}
          />
          {notifications.length ? (
            <div
              onClick={onAllNotificationsRead}
              className={styles.clearButton}
            >
              <Trans>Clear notifications</Trans>
            </div>
          ) : null}
        </div>
      }
    >
      <Badge
        count={notifications.length}
        dot
        offset={[-10, 10]}
        className={styles.iconButton}
      >
        <BellOutlined className={styles.iconFont} />
      </Badge>
    </Popover>
  */);

  return (
    <St.HeaderWrapper>
      <Header id="layoutHeader">
        <St.CollapsedButton onClick={onCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </St.CollapsedButton>
        <div>{rightContent}</div>
      </Header>
    </St.HeaderWrapper>
  );
};

export default CustomHeader;
