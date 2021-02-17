import React from 'react';
import { Table, Tag } from 'antd';
//import './browser.css';
// green: '#64ea91',
// blue: '#8fc9fb',
// purple: '#d897eb',
// red: '#f69899',
// yellow: '#f8c82e',
// peach: '#f797d6',
// borderBase: '#e5e5e5',
// borderSplit: '#f4f4f4',
// grass: '#d6fbb5',
// sky: '#c1e0fc',

// .browser-percent {
//   text-align: right !important;
// }

// .broswer-name {
//   text-align: left !important;
// }

const status = {
  1: {
    color: '#64ea91'
  },
  2: {
    color: '#f69899'
  },
  3: {
    color: '#8fc9fb'
  },
  4: {
    color: '#f8c82e'
  }
};

function Browser({ data }) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      className: 'name'
    },
    {
      title: 'percent',
      dataIndex: 'percent',
      className: 'percent',
      render: (text, it) => <Tag color={status[it.status].color}>{text}%</Tag>
    }
  ];
  return (
    <Table
      pagination={false}
      showHeader={false}
      columns={columns}
      rowKey="name"
      dataSource={data}
    />
  );
}

export default Browser;
