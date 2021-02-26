import React from 'react';
import { Table, Tag } from 'antd';
import styled from 'styled-components';

const status = {
  1: {
    color: '#64ea91'
  },
  2: {
    color: '#f69899'
  },
  3: {
    color: '#8fc9fb'
  }
};

const St = {
  Comment: styled.div`
    :global .ant-table-thead > tr > th {
      background: #fff;
      border-bottom: solid 1px @border-color-base;
    }
  `,
  Avatar: styled.span`
    width: 48px;
    height: 48px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    background: #f8f8f8;
    display: inline-block;
  `,
  Content: styled.p`
    text-align: left;
    color: #757575;
  `,
  Date: styled.span`
    color: #a3a3a3;
    line-height: 30px;
  `,
  Daterow: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Name: styled.h5`
    font-size: 14px;
    color: #474747;
    text-align: left;
  `,
  Avatarcolumn: styled.div`
    vertical-align: top;
  `
};
function Comments({ data }) {
  const columns = [
    {
      title: 'avatar',
      dataIndex: 'avatar',
      width: 48,
      className: 'avatarcolumn',
      render: (text) => (
        <St.Avatar style={{ backgroundImage: `url(${text})` }} />
      )
    },
    {
      title: 'content',
      dataIndex: 'content',
      render: (text, it) => (
        <div>
          <St.Name>{it.name}</St.Name>
          <St.Content>{it.content}</St.Content>
          <St.Daterow>
            <Tag color={status[it.status].color}>{status[it.status].text}</Tag>
            <St.Date>{it.date}</St.Date>
          </St.Daterow>
        </div>
      )
    }
  ];
  return (
    <St.Comment>
      <Table
        pagination={false}
        showHeader={false}
        columns={columns}
        rowKey="avatar"
        dataSource={data.filter((item, key) => key < 3)}
      />
    </St.Comment>
  );
}

export default Comments;
