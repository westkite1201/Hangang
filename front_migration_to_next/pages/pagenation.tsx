import { useState } from 'react';
import useRequest from '../hooks/useRequest';
import { clientConfig } from '../configuration/clientConfig';
import { IQuote, IQuotseRes, IGetQuotesParam } from '../interfaces';
const PATH = clientConfig.endpoint.api + '/hangang/';
function Page({ index }) {
  const { data, error } = useRequest<IQuotseRes>({
    method: 'post',
    url: PATH + 'word_data',
    data: {
      accepted: '0',
      pageNum: index,
      pageCount: 5
    }
  });
  console.log(data);
  //const { data } = useSWR(`/api/data?page=${index}`, fetcher);
  // ... handle loading and error states
  const DivList =
    data &&
    data.data.quotes_array.map((item) => <div key={item.id}>{item.word}</div>);
  return <>{DivList}</>;
}
function App() {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div>
      <Page index={pageIndex} />
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
}

export default App;
