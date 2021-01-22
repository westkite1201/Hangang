import React from "react";
import Link from "next/link";
import { wrapper } from "../store";
import QuotesGridView from "../components/Quotes/QuotesGridView";
import { useSelector } from "react-redux";
import { getQuotesThunk } from "../lib/slices/quotesSlice";
import { RootState } from "../store";
const Quotes = (props) => {
  const { loading, quotesData } = useSelector(
    (state: RootState) => state.quotes
  );
  console.log("quotesData", loading, quotesData);
  return (
    <div>
      <QuotesGridView quotesData={quotesData} />
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  const params = {
    accepted: "0",
    pageNum: 1,
    pageCount: 5,
  };
  await store.dispatch<any>(getQuotesThunk(params));
});
export default Quotes;
