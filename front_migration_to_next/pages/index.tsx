import { useSelector } from 'react-redux';

import { wrapper } from '../store';
import { getHangangTempThunk } from '../lib/slices/hangangSlice';
import { getQuotesThunk, PAGE_COUNT } from '../lib/slices/quotesSlice';
import { RootState } from '../store';
import dynamic from 'next/dynamic';
//import HangangMain from '../components/Hangang/HangangMain';
const HangangMain = dynamic(() => import('../components/Hangang/HangangMain'));

const IndexPage = ({ themeMode }) => {
  const { riverTempData } = useSelector((state: RootState) => state.hangang);
  return <HangangMain riverTempData={riverTempData} themeMode={themeMode} />;
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
