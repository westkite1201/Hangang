/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_QUOTES_REQUEST } from '../../modules/quotes/reducer';
import QuotesCard from '../../component/QuotesCard';
import Loading from '../../component/common/Loading/Loading.tsx';
import styled from 'styled-components';
import InfoCard from '../../component/common/InfoCard/InfoCard.tsx';
import { useInfinteScroll } from '../../hooks';

const PAGE_COUNT = 5;
const QuotesCardList = ({ quotesList }) => {
  return quotesList.map((quotes) => {
    return <QuotesCard quotes={quotes} key={quotes._id} />;
  });
};

/* 명언 그리드  */
const QuotesGridViewComponent = () => {
  const { quotesData, pageNum } = useSelector((state) => state.quotes);
  const { data: quotesList, loading, totalCount, isLast } = quotesData;
  const maxPageNum = useRef(1);
  const [target, setTarget] = useState(null);

  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !quotesData.isLoading && !quotesData.isLast) {
        dispatch({
          type: GET_QUOTES_REQUEST,
          payload: { accepted: '0', pageNum: pageNum, pageCount: PAGE_COUNT },
        });
      }
    },
  });

  useEffect(() => {
    maxPageNum.current = Math.ceil(totalCount / PAGE_COUNT);
  }, [totalCount]);

  const dispatch = useDispatch();

  return (
    <QuotesWrapper>
      {quotesList && quotesList.length !== 0 && (
        <QuotesCardList quotesList={quotesList} />
      )}
      {loading && (
        <LoadingWrapper>
          <Loading size={50} color={'#b197fc'} />
        </LoadingWrapper>
      )}
      {isLast && <InfoCard info="마지막 카드 입니다.." />}
      <div ref={setTarget} className="last-item" />
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
