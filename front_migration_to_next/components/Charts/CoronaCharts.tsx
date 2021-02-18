import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Legend,
  Bar,
  Line,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const UsageAndBill = ({ tabButtonKey }) => {
  const [usageStatus, setUsageStatus] = useState([]);
  useEffect(() => {
    axios.get('/data/SmartView/usageAndBill.json').then((res) => {
      const dataTemp = res.data[tabButtonKey].map((data) => {
        return {
          xAxis: data.MR_HHMI,
          '사용량(kWh)': data.F_AP_QT,
          '전년 사용량(kWh)': data.LYEAR_F_AP_QT,
          '요금(원)': data.KWH_BILL
        };
      });
      setUsageStatus(dataTemp);
    });
  }, [tabButtonKey]);

  const formatXAxis = (tickItem) => {
    if (tickItem && tabButtonKey === 'hourlyUsage')
      return `${tickItem.slice(0, 2)}시`;
    else if (tickItem && tabButtonKey === 'monthlyUsage')
      return `${tickItem}월`;
    else if (tickItem && tabButtonKey === 'yearlyUsage') return `${tickItem}년`;
    else return tickItem;
  };
  const formatYAxis = (tickItem) => tickItem.toLocaleString();
  const formatTooltip = (tickItem) => tickItem.toLocaleString();

  return (
    <ResponsiveContainer>
      <ComposedChart
        data={usageStatus}
        margin={{ top: 80, right: 40, bottom: 30, left: 40 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="xAxis"
          padding={
            tabButtonKey === 'yearlyUsage'
              ? { left: 450, right: 450 }
              : { left: 40, right: 40 }
          }
          tickFormatter={formatXAxis}
        />
        <YAxis
          type="number"
          yAxisId="left"
          label={{ value: '원', offset: 30, angle: 0, position: 'top' }}
          tickFormatter={formatYAxis}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'kWh', offset: 30, angle: 0, position: 'top' }}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={formatTooltip}
          labelFormatter={formatXAxis}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="요금(원)"
          barSize={tabButtonKey === 'yearlyUsage' ? 150 : 30}
          fill="#7ac4c0"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="사용량(kWh)"
          stroke="#fcac8d"
          strokeWidth="2"
          //animationDuration="400"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="전년 사용량(kWh)"
          stroke="#8fa3d1"
          hide={tabButtonKey === 'yearlyUsage' && true}
          strokeWidth="2"
          //animationDuration="500"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default UsageAndBill;
