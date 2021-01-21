/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuotesCard from './QuotesCard';
import Loading from '../common/Loading/Loading';
import InfoCard from '../common/InfoCard/InfoCard';
import styled from 'styled-components';
import { IQuote } from '../../interfaces';
import { IQuotesData, getQuotesThunk } from '../../lib/slices/quotesSlice';
import { useInfinteScroll } from '../../hooks/useInfinteScroll';
const PAGE_COUNT = 5;
/* 명언 그리드  */
type QuotesGridviewProps = {
  quotesData: IQuotesData;
};
const QuotesGridView = ({ quotesData }: QuotesGridviewProps) => {
  const { quotesArray, totalCount } = quotesData;
  const dispatch = useDispatch();
  const maxPageNum = useRef(1);
  useEffect(() => {
    maxPageNum.current = Math.ceil(totalCount / PAGE_COUNT);
  }, [totalCount]);
  const [target, setTarget] = useState(null);

  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        const params = {
          accepted: '0',
          pageNum: 1,
          pageCount: 5,
        };
        dispatch(getQuotesThunk(params));
      }
    },
  });

  return (
    <QuotesWrapper>
      {quotesArray &&
        quotesArray.length !== 0 &&
        quotesArray.map((quotes: IQuote, index: number) => {
          return (
            <QuotesCard
              quotes={quotes}
              index={quotes._id + ' ' + index}
              key={quotes._id}
            />
          );
        })}
      {/*loading && (
        <LoadingWrapper>
          <Loading size={50} color={'#b197fc'} />
        </LoadingWrapper>
      )*/}
      {/*isLast && <InfoCard info="마지막 카드 입니다.." /> */}
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

export default QuotesGridView;
