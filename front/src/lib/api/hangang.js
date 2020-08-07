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
export async function getQuotes() {
  //   const data = {
  //     todoNum: todoNum
  //   };
  const body = {
    accepted: '0'
  };
  const response = await axios.post(
    `${cilentConfig.endpoint.api}/hangang/word_data`,
    body
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getSubmitQuotes() {
  const body = {
    accepted: '0'
  };
  const response = await axios.post(
    `${cilentConfig.endpoint.api}/hangang/word_data`,
    body
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
// router.get('/word_data', async (req, res) => {
//     try {
//       return res.json({
//         result: '0000',
//         data: wiseSayingData.data
//       });

//     } catch (error) {
//       console.error(error);
//       return res.json('error');
//     }
//   })
