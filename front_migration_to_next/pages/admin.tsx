//import HangangMain from '../components/Hangang/HangangMain';
import Dashboard from '../components/DashBoard/DashBoardMain';
import dynamic from 'next/dynamic';
import NumberCard from '../components/common/NumberCard';
import User from '../components/common/User';
import BrowserView from '../components/DashBoard/BrowserView';
import Weather from '../components/DashBoard/Weather';
import RecentSales from '../components/DashBoard/RecentSales';
import Comments from '../components/DashBoard/Comments';
import PieChartComponent from '../components/common/chart/PieChartComponent';
//import Corona from '../components/Charts/CoronaCharts';
import { Row, Col } from 'antd';
import { browser, recent, comments } from '../components/DashBoard/Data';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from 'antd';

const Corona = dynamic(() => import('../components/Charts/CoronaCharts'), {
  ssr: false
});

// interface ICompoentWrapperProps {
//   children?: React.ReactNode;
// }
const ComponentWrapper = ({ children }) => {
  return (
    children &&
    children.length !== 0 &&
    children.map((item, index) => {
      return <St.Wrapper key={index}>{item}</St.Wrapper>;
    })
  );
};
const Admin = ({ themeMode }) => {
  const [tabButtonKey, setTabButtonKey] = useState('weekStatus');
  function handleButton(value: string) {
    setTabButtonKey(value);
  }
  return (
    <Dashboard themeMode={themeMode}>
      <Row gutter={[16, 24]}>
        <Col span={6}>
          {/*
          <Button onClick={() => handleButton('accumulateStatus')}>누적</Button>
          <Button onClick={() => handleButton('allStatus')}>전체</Button>
          */}
          <Button onClick={() => handleButton('weekStatus')}>일주일</Button>
          <Button onClick={() => handleButton('monthlyStatus')}>한달</Button>
          {
            <ComponentWrapper>
              <NumberCard
                icon={'user'}
                title={'member'}
                value={280}
                color={'#fffff'}
              />
              <User username={'seo'} avatar={''} sales={100} sold={100} />
            </ComponentWrapper>
          }
        </Col>
        <Col span={12}>
          <div style={{ width: '100%', height: '500px' }}>
            <Corona tabButtonKey={tabButtonKey} />
          </div>
          {/*
          <ComponentWrapper>
            <NumberCard
              icon={'user'}
              title={'member'}
              value={280}
              color={'#fffff'}
            />
            <Comments data={comments} />
            <RecentSales data={recent} />
          </ComponentWrapper>
*/}
        </Col>
        <Col span={6}>
          {/*
          <ComponentWrapper>
        
            <PieChartComponent width={400} height={400} />
            <BrowserView data={browser} />
            <Weather
              city={'서울'}
              icon={''}
              dateTime={18}
              temperature={10}
              name={'추움'}
              loading={false}
            />
            
          </ComponentWrapper>*/}
        </Col>
      </Row>
    </Dashboard>
  );
};

const St = {
  Wrapper: styled.div`
    background: ${({ theme }) => theme.mode.mainBackground};
    margin: 10px;
  `
};

export default Admin;
