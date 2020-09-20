import React, { useEffect, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUOTES_REQUEST } from '../../modules/hangang/reducer';
import QuotesCard from '../../component/QuotesCard';
import styled from 'styled-components';
const QuotesCardList = ({ quotesList }) => {
  return quotesList.map((quotes, key) => {
    return <QuotesCard quotes={quotes} key={key} />;
  });
};

/* 명언 그리드  */
const QuotesGridViewComponent = () => {
  const { quotesData } = useSelector((state) => state.hangang);
  const { data: quotesList } = quotesData;
  console.log('data ', quotesList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_QUOTES_REQUEST,
      payload: { accepted: '0' }
    });
  }, [dispatch]);

  return (
    <QuotesWrapper>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} lg={1}></Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container spacing={3}>
            {quotesList && quotesList.length !== 0 && (
              <QuotesCardList quotesList={quotesList} />
            )}
          </Grid>
        </Grid>
        <Grid item xs={1} md={1} lg={1}></Grid>
      </Grid>
    </QuotesWrapper>
  );
};
const QuotesWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;
export default QuotesGridViewComponent;
