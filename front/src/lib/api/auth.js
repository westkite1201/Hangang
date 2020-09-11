//import axios from './apiClient';
import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig';

export async function loginHangang(payload) {
  //   const data = {
  //
  //   };
  const response = await axios.post(
    `${cilentConfig.endpoint.api}/auth/login`,
    payload
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
export async function signUpHangang(payload) {
  //   const data = {
  //
  //   };
  const response = await axios.post(
    `${cilentConfig.endpoint.api}/auth/login`,
    payload
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
