/* eslint-disable @typescript-eslint/no-empty-interface */
//import axios from './apiClient';
import axios from "axios";
import { clientConfig } from "../../configuration/clientConfig";
import { IHangangTempRes } from "../../interfaces";

export async function getHangangTemp() {
  //   const data = {
  const response = await axios.get<IHangangTempRes>(
    `${clientConfig.endpoint.api}/hangang/hangang_data`
  );
  console.log("getHangangTemp response  ", response);
  return response.data.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

// export async function getHangangTempertureChart() {
//   //   const data = {
//   const response = await axios.get<HangangTemp[]>(
//     `${cilentConfig.endpoint.api}/hangang/hangang_data`
//   );
//   return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
// }
