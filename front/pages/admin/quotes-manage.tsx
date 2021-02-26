import DashBoard from '../../components/DashBoard/DashBoardMain';
//import HangangMain from '../components/Hangang/HangangMain';
import { wrapper } from '../../store';
import { useSelector } from 'react-redux';
import QuotesManage from '../../components/Quotes/QuotesManage';
import { getQuotesThunk, PAGE_COUNT } from '../../lib/slices/quotesSlice';
import { RootState } from '../../store';

const QuotesManagement = ({ themeMode }) => {
  const { quotesData } = useSelector((state: RootState) => state.quotes);
  return (
    <DashBoard themeMode={themeMode}>
      <QuotesManage quotesData={quotesData} />
    </DashBoard>
  );
};
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const params = {
    accepted: '0',
    pageNum: 1,
    pageCount: PAGE_COUNT
  };
  await store.dispatch<any>(getQuotesThunk(params));
});

export default QuotesManagement;
