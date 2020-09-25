//import axios from './apiClient';
import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig';

export async function getHangangTemp() {
  //   const data = {
  //     todoNum: todoNum
  //   };
  const response = await axios.get(
    `${cilentConfig.endpoint.api}/hangang/hangang_data`
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
