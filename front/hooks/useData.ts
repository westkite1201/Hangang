// usePoints.js
import useSWR from 'swr';
import { clientConfig } from '../configuration/clientConfig';
import { IGetCoronaRes, IGetCoronaParams } from '../interfaces';
import axios from 'axios';

//const fetcher = (url) => axios.get(url).then((res) => res.data);

const fetcher = (url: string, data: string) => {
  return axios.post<IGetCoronaRes>(url, JSON.parse(data));
};
const useData = (params) => {
  const res = useSWR(
    [`${clientConfig.endpoint.api}/ext/get-corona`, params],
    fetcher
  );
  console.log('res ', res);
  const { data, error } = res;
  return { data, error };
};

export default useData;
