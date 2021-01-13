import { useEffect } from "react";
import { GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

const Test = () => {
  const { loading } = useSelector((state: RootState) => state.quotes);
  console.log("loading ", loading);

  useEffect(() => {
    //dispatch(getQuotesRequest());
  }, []);
  return (
    <>
      <div>{"hello"}</div>
    </>
  );
};

export default Test;
export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context);
  return { props: {} };
};
