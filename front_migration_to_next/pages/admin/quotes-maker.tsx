import dynamic from 'next/dynamic';
import DashBoard from '../../components/DashBoard/DashBoardMain';
//import HangangMain from '../components/Hangang/HangangMain';
const QuotesMaker = dynamic(
  () => import('../../components/Quotes/QuotesMaker'),
  {
    ssr: false
  }
);

const Admin = () => {
  return (
    <DashBoard>
      <QuotesMaker />
    </DashBoard>
  );
};

export default Admin;
