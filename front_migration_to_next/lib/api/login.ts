/* eslint-disable @typescript-eslint/no-empty-interface */
//import axios from './apiClient';
import axios from 'axios';
import { clientConfig } from '../../configuration/clientConfig';
import { IHangangTempRes } from '../../interfaces';
import { IUserData } from '../../interfaces';

export async function getLoginData() {
  //   const data = {
  const response = await axios.get<IHangangTempRes>(
    `${clientConfig.endpoint.api}/hangang/hangang_data`
  );
  console.log('getLoginData response  ', response);
  return response.data.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getTestData() {
  const response = await axios.get<IUserData>(
    `${clientConfig.endpoint.api}/auth/login-test`
  );

  console.log('getTestData response: ', response);
  const { data } = response;
  return {
    access_token: data.ACCESS_TOKEN,
    user_id: data.USER_ID,
    user_type: data.USER_TYPE
  };
}
