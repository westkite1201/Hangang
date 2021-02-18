import React from 'react';
import dynamic from 'next/dynamic';
const QuotesGridView = dynamic(() =>
  import('../components/Quotes/QuotesManage')
);
const Quotes = () => {
  return <QuotesGridView />;
};

export default Quotes;
