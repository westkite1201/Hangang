//import HangangMain from '../components/Hangang/HangangMain';
import Dashboard from '../components/DashBoard/DashBoardMain';
// const QuotesMaker = dynamic(() => import('../components/Quotes/QuotesMaker'), {
//   ssr: false
// });
import NumberCard from '../components/common/NumberCard';
import User from '../components/common/User';
import BrowserView from '../components/DashBoard/BrowserView';
import Weather from '../components/DashBoard/Weather';
import RecentSales from '../components/DashBoard/RecentSales';
import Comments from '../components/DashBoard/Comments';
import PieChartComponent from '../components/common/chart/PieChartComponent';

import { Row, Col } from 'antd';
import { browser, recent, comments } from '../components/DashBoard/Data';
import styled from 'styled-components';

const ComponentWrapper = ({ children }) => {
  return (
    children &&
    children.map((item) => {
      return <St.Wrapper>{item}`</St.Wrapper>;
    })
  );
};
const Admin = ({ themeMode }) => {
  return (
    <Dashboard themeMode={themeMode}>
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <ComponentWrapper>
            <NumberCard
              icon={'user'}
              title={'member'}
              value={280}
              color={'#fffff'}
            />
            <User username={'seo'} avatar={''} sales={100} sold={100} />
          </ComponentWrapper>
        </Col>
        <Col span={12}>
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
        </Col>
        <Col span={6}>
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
          </ComponentWrapper>
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
