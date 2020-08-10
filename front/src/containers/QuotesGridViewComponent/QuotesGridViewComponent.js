import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUOTES_REQUEST } from '../../modules/hangang/reducer';
import QuotesCard from '../../component/QuotesCard';

const QuotesCardList = ({ quotesList }) => {
  return quotesList.map((quotes, key) => {
    return <QuotesCard quotes={quotes} key={key} />;
  });
};

/* 명언 그리드  */
const QuotesGridViewComponent = () => {
  const { quotesData } = useSelector((state) => state.hangang);
  const { data: quotesList } = quotesData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_QUOTES_REQUEST,
      payload: { accepted: '0' }
    });
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={1} md={1} lg={1}></Grid>
      <Grid item xs={10} md={10} lg={10}>
        <Grid container spacing={3}>
          {quotesList && <QuotesCardList quotesList={quotesList} />}
        </Grid>
      </Grid>
      <Grid item xs={1} md={1} lg={1}></Grid>
    </Grid>
  );
};
export default QuotesGridViewComponent;
