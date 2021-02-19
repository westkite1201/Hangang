//import axios from './apiClient';
import axios from 'axios';
import { clientConfig } from '../../configuration/clientConfig';
import { IGetCoronaRes, IGetCoronaParams } from '../../interfaces';

export async function getCorona(data: IGetCoronaParams) {
  //   const data = {
  const response = await axios.post<IGetCoronaRes>(
    `${clientConfig.endpoint.api}/ext/get-corona`,
    data
  );
  console.log('getCorona getCorona  ', response.data);
  return response.data.data.response.body.items.item; // 데이터 값을 바로 반환하도록 처리합니다.
}
