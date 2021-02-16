/* eslint-disable @typescript-eslint/no-empty-interface */
//import axios from './apiClient';
import axios from 'axios';
import { clientConfig } from '../../configuration/clientConfig';
import { ILoginUserData, ISnsUserData } from '../../interfaces';
import { IUserData } from '../../interfaces';

export async function getLoginData(params: ILoginUserData) {
  const postBody = {
    mem_email: params.MEM_EMAIL,
    mem_password: params.MEM_PASSWORD
  };

  const response = await axios.post<IUserData>(
    `${clientConfig.endpoint.api}/auth/login`,
    postBody
  );

  console.log('getTestData response: ', response);
  const { data } = response;
  return {
    access_token: data.ACCESS_TOKEN,
    user_id: data.USER_ID,
    user_type: data.USER_TYPE
  };
}

export async function getSnsLoginData(params: ISnsUserData) {
  const postBody = {
    sns_type: params.SNS_TYPE,
    access_token: params.ACCESS_TOKEN
  };

  console.log('postBody: ', postBody);
  const response = await axios.post<IUserData>(
    `${clientConfig.endpoint.api}/auth/sns-login`,
    postBody
  );

  console.log('getSnsLoginData response: ', response);
  const { data } = response;
  return {
    access_token: data.ACCESS_TOKEN,
    user_id: data.USER_ID,
    user_type: data.USER_TYPE
  };
}
