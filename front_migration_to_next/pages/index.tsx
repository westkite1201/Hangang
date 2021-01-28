import { useSelector } from 'react-redux';
import HangangMain from '../components/Hangang/HangangMain';
import { wrapper } from '../store';
import { getHangangTempThunk } from '../lib/slices/hangangSlice';
import { RootState } from '../store';
const IndexPage = () => {
  const { riverTempData } = useSelector((state: RootState) => state.hangang);
  console.log(riverTempData);
  return <>{<HangangMain riverTempData={riverTempData} />}</>;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch<any>(getHangangTempThunk());
});

export default IndexPage;
