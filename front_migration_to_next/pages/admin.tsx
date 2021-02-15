import dynamic from 'next/dynamic';
//import HangangMain from '../components/Hangang/HangangMain';
import Dashboard from '../components/DashBoard/DashBoardMain';
// const QuotesMaker = dynamic(() => import('../components/Quotes/QuotesMaker'), {
//   ssr: false
// });

const Admin = () => {
  return <Dashboard></Dashboard>;
};

export default Admin;
