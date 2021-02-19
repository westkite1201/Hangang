import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Legend,
  Bar,
  LabelList,
  Line,
  Cell,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import corona_data from './corona.json';
export interface ICoronaInfo {
  accDefRate: number;
  accExamCnt: number;
  accExamCompCnt: number;
  careCnt: number;
  clearCnt: number;
  createDt: Date;
  deathCnt: number;
  decideCnt: number;
  examCnt: number;
  resutlNegCnt: number;
  seq: number;
  stateDt: number;
  stateTime: string;
  updateDt: Date | null;
  dailyDecideStatus: number;
}
import { getColor } from '../../lib/helper';
//일별 확진자
//월별 확진자
//누적 합
const Corona = ({ tabButtonKey }) => {
  const [usageStatus, setUsageStatus] = useState([]);
  useEffect(() => {
    const res = corona_data.data.response.body.items.item;
    const coronaStatus = [];
    for (let i = 0; i < res.length - 2; i++) {
      coronaStatus.push({
        ...res[i],
        stateDt: moment(res[i].stateDt.toString()).format('M.DD'),
        dailyDecideStatus: res[i].decideCnt - res[i + 1].decideCnt
      });
    }
    console.log(coronaStatus);
    setUsageStatus(coronaStatus.reverse());
  }, [tabButtonKey]);

  const formatXAxis = (tickItem) => {
    if (tickItem && tabButtonKey === 'hourlyUsage')
      return `${tickItem.slice(0, 2)}시`;
    else if (tickItem && tabButtonKey === 'monthlyUsage')
      return `${tickItem}월`;
    else if (tickItem && tabButtonKey === 'daliyStatus') {
      return `${tickItem}`;
    } else return tickItem;
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
          dataKey="stateDt"
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
          label={{ value: '확진자 수', offset: 30, angle: 0, position: 'top' }}
          tickFormatter={formatYAxis}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={formatTooltip}
          labelFormatter={formatXAxis}
        />
        <Legend />
        {tabButtonKey === 'daliyStatus' ? (
          <Bar
            yAxisId="left"
            dataKey="dailyDecideStatus"
            barSize={10}
            fill="#ff6b6b"
            name="일일 확진자"
          >
            {usageStatus &&
              usageStatus.map((entry: ICoronaInfo, index) => {
                const color = getColor(
                  true,
                  entry.dailyDecideStatus,
                  1,
                  1000,
                  'red'
                );
                return <Cell fill={color} key={`cell-${index}`} />;
              })}
            <LabelList dataKey="dailyDecideStatus" position="top" />
          </Bar>
        ) : (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="decideCnt"
            stroke="#fcac8d"
            hide={tabButtonKey === 'daliyStatus' && true}
            strokeWidth="2"
            name="누적 확진자"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default Corona;
