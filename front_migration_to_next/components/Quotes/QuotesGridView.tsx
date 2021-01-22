/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuotesCard from "./QuotesCard";
import { Grid } from "@material-ui/core";
import Loading from "../common/Loading/Loading";
import InfoCard from "../common/InfoCard/InfoCard";
import styled from "styled-components";
import { IQuote } from "../../interfaces";
import { IQuotesData, getQuotesThunk } from "../../lib/slices/quotesSlice";
import { useInfinteScroll } from "../../hooks/useInfinteScroll";
const PAGE_COUNT = 5;
/* 명언 그리드  */
type QuotesGridviewProps = {
  quotesData: IQuotesData;
};
const QuotesGridView = ({ quotesData }: QuotesGridviewProps) => {
  const { quotesArray, totalCount, isLast, pageNum, loading } = quotesData;
  const dispatch = useDispatch();
  const maxPageNum = useRef(1);

  useEffect(() => {
    maxPageNum.current = Math.ceil(totalCount / PAGE_COUNT);
  }, [totalCount]);
  const [target, setTarget] = useState(null);

  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !isLast && !loading) {
        const params = {
          accepted: "0",
          pageNum: pageNum,
          pageCount: PAGE_COUNT,
        };
        dispatch(getQuotesThunk(params));
      }
    },
  });

  return (
    <QuotesWrapper>
      <Grid container spacing={3}>
        <Grid item xs={1} md={1} lg={1}></Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container spacing={3}>
            {quotesArray &&
              quotesArray.length !== 0 &&
              quotesArray.map((quotes: IQuote, index: number) => {
                return (
                  <QuotesCard
                    quotes={quotes}
                    index={quotes._id + " " + index}
                    key={quotes._id}
                  />
                );
              })}
            {/*loading && (
            <LoadingWrapper>
              <Loading size={50} color={'#b197fc'} />
            </LoadingWrapper>
          )*/}
            {isLast && <InfoCard info="마지막 카드 입니다.." />}
            <div ref={setTarget} className="last-item" />
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

export default QuotesGridView;
