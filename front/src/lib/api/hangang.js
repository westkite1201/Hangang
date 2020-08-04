import axios from './apiClient';

export async function getHangangTemp() {
  //   const data = {
  //     todoNum: todoNum
  //   };
  const response = await axios.get(`http://localhost:3031/api/hangang/getHangangTemp`);
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
