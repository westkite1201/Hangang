import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUOTES_REQUEST } from '../../modules/hangang/reducer';
import QuotesCard from '../../component/QuotesCard';
import Loading from '../../component/common/Loading/Loading.tsx';
import { useInfinteScroll } from '../../hooks';

const PAGE_COUNT = 5;
const QuotesCardList = ({ quotesList }) => {
  return quotesList.map((quotes, key) => {
    return <QuotesCard quotes={quotes} key={key} />;
  });
};

/* 명언 그리드  */
const QuotesGridViewComponent = () => {
  const { quotesData, pageNum } = useSelector((state) => state.hangang);
  const maxPageNum = useRef(1);
  const [target, setTarget] = useState(null);
  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (
        isIntersecting &&
        !quotesData.isLoading &&
        maxPageNum.current < pageNum
      ) {
        dispatch({
          type: GET_QUOTES_REQUEST,
          payload: { accepted: '0', pageNum: pageNum, pageCount: PAGE_COUNT }
        });
      }
    }
  });

  const { data: quotesList, loading, totalCount } = quotesData;
  useEffect(() => {
    console.log(
      ' Math.ceil(totalCount / PAGE_COUNT) ',
      totalCount,
      Math.ceil(totalCount / PAGE_COUNT)
    );
    maxPageNum.current = Math.ceil(totalCount / PAGE_COUNT);
  }, [totalCount]);

  console.log('data ', quotesList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_QUOTES_REQUEST,
      payload: { accepted: '0', pageNum: pageNum, pageCount: PAGE_COUNT }
    });
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={1} md={1} lg={1}></Grid>
      <Grid item xs={10} md={10} lg={10}>
        <Grid container spacing={3}>
          {quotesList && quotesList.length !== 0 && (
            <QuotesCardList quotesList={quotesList} />
          )}
          {loading && <Loading />}
          <div ref={setTarget} className="last-item" />
        </Grid>
      </Grid>
      <Grid item xs={1} md={1} lg={1}></Grid>
    </Grid>
  );
};
export default QuotesGridViewComponent;
