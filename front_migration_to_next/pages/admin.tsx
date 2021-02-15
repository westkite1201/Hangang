import dynamic from 'next/dynamic';
//import HangangMain from '../components/Hangang/HangangMain';
const QuotesMaker = dynamic(() => import('../components/Quotes/QuotesMaker'), {
  ssr: false
});

const Admin = () => {
  <QuotesMaker />;
};

export default Admin;
