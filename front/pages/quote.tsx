import React from 'react';
import { wrapper } from '../store';
import { useSelector } from 'react-redux';
import { getQuotesThunk, PAGE_COUNT } from '../lib/slices/quotesSlice';
import { RootState } from '../store';
import dynamic from 'next/dynamic';
const QuotesGridView = dynamic(() =>
  import('../components/Quotes/QuotesGridView')
);
const Quotes = (props) => {
  const { quotesData } = useSelector((state: RootState) => state.quotes);
  return <QuotesGridView quotesData={quotesData} />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const params = {
    accepted: '0',
    pageNum: 1,
    pageCount: PAGE_COUNT
  };
  await store.dispatch<any>(getQuotesThunk(params));
});
export default Quotes;
