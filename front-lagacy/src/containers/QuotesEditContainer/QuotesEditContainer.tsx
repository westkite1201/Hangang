/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Grid } from '@material-ui/core';
//import QuotesCard from '../../component/QuotesCard';
import styled from 'styled-components';
import Loading from '../../component/common/Loading/Loading';
import {
  GET_QUOTES,
  EDIT_QUOTES,
  Quotes,
  Quote
} from '../../lib/graphql/admin';
import { useQuery, useMutation } from '@apollo/react-hooks';

export type QuoteInfo = {
  id: string;
  word: string;
  name: string;
};

export interface QuotesCardProps {
  quotes: Quote[];
  setQuote: (quote: Quote) => void;
  handleQuote: (e: React.ChangeEvent<HTMLInputElement>, quote: Quote) => void;
  quoteInfo: QuoteInfo;
}

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: 8px;
  background-color: lightblue;
  padding: 8px;
`;

const QuotesCardList: React.FC<QuotesCardProps> = ({
  quotes,
  setQuote,
  handleQuote,
  quoteInfo
}) => {
  const quotesList = quotes.map((quote: Quote) => {
    return (
      <QuoteItem onClick={() => setQuote(quote)} key={quote._id}>
        {quote._id === quoteInfo.id ? (
          <input
            value={quoteInfo.word}
            onChange={(e) => handleQuote(e, quote)}
            name="word"
          />
        ) : (
          quote.WORD
        )}
        <div>
          {quote._id === quoteInfo.id ? (
            <input
              value={quoteInfo.name}
              onChange={(e) => handleQuote(e, quote)}
              name="name"
            />
          ) : (
            quote.NAME
          )}
        </div>
      </QuoteItem>
    );
  });
  return <Fragment>{quotesList}</Fragment>;
};

/* 명언 그리드  */
const QuotesGridViewComponent = () => {
  const [quoteInfo, setQuoteInfo] = useState({ id: '', word: '', name: '' });
  const { loading, data, error } = useQuery<Quotes>(GET_QUOTES, {
    variables: { status: '0' } // useQuery 사용할 때 변수 넘기는 방법
  });
  console.log(error);
  const [editQuotes] = useMutation(EDIT_QUOTES);

  const setQuote = (quote: Quote) => {
    setQuoteInfo({
      id: quote._id,
      word: quote.WORD,
      name: quote.NAME
    });
  };
  const handleQuote = (
    e: React.ChangeEvent<HTMLInputElement>,
    quote: Quote
  ) => {
    console.log(e.target.name);
    if (e.target.name === 'word') {
      setQuoteInfo({
        ...quoteInfo,
        word: e.target.value
      });
    } else {
      setQuoteInfo({
        ...quoteInfo,
        name: e.target.value
      });
    }
  };
  const handleEdit = async () => {
    console.log(quoteInfo);
    await editQuotes({
      variables: {
        id: quoteInfo.id,
        name: quoteInfo.word,
        word: quoteInfo.name
      }
    });
  };

  console.log('[seo] ', data);
  return (
    <QuotesWrapper>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} lg={1}></Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container spacing={3}>
            <button onClick={handleEdit}>에딧 컨텐츠</button>
            {data && data.quotes && (
              <QuotesCardList
                quotes={data.quotes}
                setQuote={setQuote}
                handleQuote={handleQuote}
                quoteInfo={quoteInfo}
              />
            )}
            {loading && (
              <LoadingWrapper>
                <Loading size={50} color={'#b197fc'} />
              </LoadingWrapper>
            )}
          </Grid>
        </Grid>
        <Grid item xs={1} md={1} lg={1}></Grid>
      </Grid>
    </QuotesWrapper>
  );
};
const QuotesWrapper = styled.div`
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
`;
const LoadingWrapper = styled.div`
  margin: auto;
`;

export default QuotesGridViewComponent;
