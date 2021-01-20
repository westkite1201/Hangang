import { useDispatch, useSelector } from "react-redux";

import Clock from "../components/clock";
//import Counter from '../components/counter';
import { tick, selectClock } from "../lib/slices/clockSlice";
//import useInterval from '../lib/useInterval';
import { wrapper } from "../store";
const IndexPage = () => {
  const dispatch = useDispatch();
  //const { light } = useSelector(selectClock);
  //console.log(light);
  // Tick the time every second
  // useInterval(() => {
  //   //dispatch(tick({ light: true, lastUpdate: Date.now() }));
  // }, 1000);

  return (
    <>
      <Clock />
    </>
  );
};

// Read manual about `getServerSideProps` or `getStaticProps` usage. Choose what fits you better
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    //store.dispatch(tick({ light: false, lastUpdate: Date.now() }));
  }
);

export default IndexPage;
