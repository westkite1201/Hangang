//import axios from './apiClient';
import axios from 'axios';
import { clientConfig } from '../../configuration/clientConfig';
export interface Quote {
  font_color: string;
  thumbnail_user_image: string;
  thumbnail_background_image: string;
  accepted: string;
  insert_time: Date;
  update_time: Date;
  status: string;
  card_exps_typ_cd: string;
  _id: string;
  name: string;
  word: string;
  __v: number;
}
export interface IQuoteResData {
  quotes_array: Quote[];
  total_count: number;
}

export interface IQuotseRes {
  result: string;
  message: string;
  data: IQuoteResData;
}

export async function updateQuote(quote: Quote) {
  //   const data = {
  const response = await axios.post<IQuotseRes>(
    `${clientConfig.endpoint.api}/hangang/update_quotes_name_word`,
    quote,
  );
  console.log('updateQuote updateQuote  ', response.data.data);
  return response.data.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getQuotes(params: any) {
  const response = await axios.post<IQuotseRes>(
    `${clientConfig.endpoint.api}/hangang/word_data`,
    params,
  );
  return response.data.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
