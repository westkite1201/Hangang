import React from 'react';
import moment from 'moment';
import { Table, Tag } from 'antd';
import styled from 'styled-components';

const St = {
  Recentsales: styled.div`
    :global .ant-table-thead > tr > th {
      border-bottom: solid 1px @border-color-base;
      background: ${({ theme }) => theme.mode.mainBackground};
    }
  `
};
const status = {
  1: {
    color: '#64ea91',
    text: 'SALE'
  },
  2: {
    color: '#f69899',
    text: 'REJECT'
  },
  3: {
    color: '#8fc9fb',
    text: 'TAX'
  },
  4: {
    color: '#f8c82e',
    text: 'EXTENDED'
  }
};
// .avatarcolumn {
//   vertical-align: top;
// }

function RecentSales({ data }) {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name'
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (text) => (
        <Tag color={status[text].color}>{status[text].text}</Tag>
      )
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      render: (text) => moment(text).format('YYYY-MM-DD')
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (text, it) => (
        <span style={{ color: status[it.status].color }}>${text}</span>
      )
    }
  ];
  return (
    <St.Recentsales>
      <Table
        pagination={false}
        columns={columns}
        rowKey="id"
        dataSource={data.filter((item, key) => key < 5)}
      />
    </St.Recentsales>
  );
}

export default RecentSales;
