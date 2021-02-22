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
import { getCoronaThunk } from '../../lib/slices/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ICoronaInfo } from '../../interfaces';
import { getColor } from '../../lib/helper';
import { RootState } from '../../store';
// import corona_data from './corona.json';
// import useData from '../../hooks/useData';
//일별 확진자
//월별 확진자
//누적 합
//swr사용시 args가 많은 경우 무한루프에 봉착하는 경우로 redux 로 전환
const Corona = ({ tabButtonKey }) => {
  const [usageStatus, setUsageStatus] = useState([]);
  // const [params, setParams] = useState({
  //   pageNo: 1,
  //   numOfRows: 15,
  //   startCreateDt: moment().subtract(7, 'day').format('YYYYMMDD'),
  //   endCreateDt: moment().format('YYYYMMDD')
  // });
  //const { data, error } = useData(JSON.stringify(params));
  const dispatch = useDispatch();
  const { coronaStatusData } = useSelector((state: RootState) => state.data);
  console.log('coronaStatusData ', coronaStatusData);

  useEffect(() => {
    if (tabButtonKey === 'weekStatus') {
      //일주일
      const params = {
        pageNo: 1,
        numOfRows: 10,
        startCreateDt: moment().subtract(8, 'day').format('YYYYMMDD'),
        endCreateDt: moment().format('YYYYMMDD')
      };
      // setParams(params);
      dispatch(getCoronaThunk(params));
    } else if (tabButtonKey === 'monthlyStatus') {
      //한달
      const params = {
        pageNo: 1,
        numOfRows: 200,
        startCreateDt: moment().subtract(30, 'day').format('YYYYMMDD'),
        endCreateDt: moment().format('YYYYMMDD')
      };
      //setParams(params);
      dispatch(getCoronaThunk(params));
    } else if (tabButtonKey === 'allStatus') {
      //한달
      const params = {
        pageNo: 1,
        numOfRows: 1000,
        startCreateDt: '20200108',
        endCreateDt: moment().format('YYYYMMDD')
      };
      //setParams(params);
      dispatch(getCoronaThunk(params));
    }
  }, [tabButtonKey]);

  //
  useEffect(() => {
    if (coronaStatusData && coronaStatusData.length !== 0) {
      const res = coronaStatusData;
      const coronaStatus = [];
      for (let i = 0; i < res.length - 2; i++) {
        coronaStatus.push({
          ...res[i],
          stateDt: moment(res[i].stateDt.toString()).format('M.DD'),
          dailyDecideStatus: res[i].decideCnt - res[i + 1].decideCnt
        });
      }
      //console.log(coronaStatus);
      setUsageStatus(coronaStatus.reverse());
    }
  }, [coronaStatusData]);

  const formatXAxis = (tickItem) => {
    // if (tickItem && tabButtonKey === 'hourlyUsage')
    //   return `${tickItem.slice(0, 2)}시`;
    if (tickItem && tabButtonKey === 'monthlyStatus') return `${tickItem}`;
    else if (tickItem && tabButtonKey === 'weekStatus') {
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
            tabButtonKey === 'weekStatus'
              ? { left: 50, right: 10 }
              : { left: 20, right: 10 }
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
        {tabButtonKey !== 'accumulateStatus' ? (
          <Bar
            yAxisId="left"
            dataKey="dailyDecideStatus"
            barSize={tabButtonKey === 'weekStatus' ? 20 : 10}
            fill="#ff6b6b"
            name="일일 확진자"
            isAnimationActive={true}
            animationDuration={400}
          >
            {tabButtonKey === 'weekStatus' && (
              <LabelList dataKey="dailyDecideStatus" position="top" />
            )}

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
          </Bar>
        ) : (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="decideCnt"
            stroke="#fcac8d"
            strokeWidth="2"
            name="누적 확진자"
            isAnimationActive={true}
            animationDuration={400}
          />
        )}
        )
      </ComposedChart>
    </ResponsiveContainer>
  );
};
export default Corona;
