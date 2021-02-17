import React from 'react';
import { Button, Avatar } from 'antd';
import styled from 'styled-components';

const St = {
  UserHeader: styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    color: #fff;
    height: 200px;
    background-size: cover;
    align-items: center;

    &::after {
      content: '';
      background-image: url('./user-background.png');
      background-size: cover;
      position: absolute;
      width: 100%;
      height: 200px;
      left: 0;
      top: 0;
      opacity: 0.4;
      z-index: 1;
    }
  `,
  UserHeaderInner: styled.div`
    z-index: 2;
  `,
  Name: styled.h5`
    font-size: 16px;
    margin-top: 8px;
  `,
  Number: styled.div`
    display: flex;
    height: 116px;
    justify-content: space-between;
    border-bottom: solid 1px #f5f5f5;
  `,

  Item: styled.div`
    text-align: center;
    height: 116px;
    width: 100%;
    position: relative;
    padding: 30px 0;

    & + .item {
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 116px;
        position: absolute;
        background: #f5f5f5;
        top: 0;
      }
    }
    p {
      color: #757575;

      &:first-child {
        font-size: 16px;
      }

      &:last-child {
        font-size: 20px;
        font-weight: 700;
      }
    }
  `,

  Footer: styled.div`
    height: 116px;
    display: flex;
    justify-content: center;
    align-items: center;

    :global .ant-btn {
      color: @purple;
      border-color: @purple;
      padding: 6px 16px;
    }
  `
};

// const countUpProps = {
//   start: 0,
//   duration: 2.75,
//   useEasing: true,
//   useGrouping: true,
//   separator: ','
// };

function User({ avatar, username, sales = 0, sold = 0 }) {
  return (
    <div style={{ background: 'white' }}>
      <St.UserHeader>
        <St.UserHeaderInner>
          <Avatar size="large" src={avatar} />
          <St.Name>{username}</St.Name>
        </St.UserHeaderInner>
      </St.UserHeader>
      <St.Number>
        <St.Item>
          <p>EARNING SALES</p>
          <p>{sales}</p>
        </St.Item>
        <St.Item>
          <p>ITEM SOLD</p>
          <p>{sold}</p>
        </St.Item>
      </St.Number>
      <St.Footer>
        <Button type="ghost" size="large">
          View Profile
        </Button>
      </St.Footer>
    </div>
  );
}

export default User;
