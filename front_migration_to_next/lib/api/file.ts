//import axios from './apiClient';
import axios from 'axios';
import { clientConfig } from '../../configuration/clientConfig';
import { IQuote, IQuotseRes, IGetQuotesParam } from '../../interfaces';

export async function updateQuote(quote: IQuote) {
  //   const data = {
  const response = await axios.post<IQuotseRes>(
    `${clientConfig.endpoint.api}/hangang/update_quotes_name_word`,
    quote
  );

  return response.data.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getQuotes(params: IGetQuotesParam) {
  const response = await axios.post<IQuotseRes>(
    `${clientConfig.endpoint.api}/hangang/word_data`,
    params
  );
  return response.data.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function submitQuotes(param: IQuote) {
  const body = param;
  const response = await axios.post(
    `${clientConfig.endpoint.api}/hangang/insert_quotes`,
    body
  );
  return response.data;
}
