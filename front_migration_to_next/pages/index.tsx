import { useSelector } from 'react-redux';
import HangangMain from '../components/Hangang/HangangMain';
import { wrapper } from '../store';
import { getHangangTempThunk } from '../lib/slices/hangangSlice';
import { getQuotesThunk, PAGE_COUNT } from '../lib/slices/quotesSlice';
import { RootState } from '../store';
const IndexPage = () => {
  const { riverTempData } = useSelector((state: RootState) => state.hangang);
  console.log(riverTempData);
  return <>{<HangangMain riverTempData={riverTempData} />}</>;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch<any>(getHangangTempThunk());
  const params = {
    accepted: '0',
    pageNum: 1,
    pageCount: PAGE_COUNT
  };
  await store.dispatch<any>(getQuotesThunk(params));
});

export default IndexPage;
