import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';
const rCho = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
const rJung = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
];
//맵핑 테이블
//{ ㄱ : '1' }
let cJong = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
//초성 : 종성의 몇번째에 해당하는지
let dict = {};
const mappingTable = rCho.map((item) => {
  dict[item] = cJong.indexOf(item);
});
console.log(dict);
const complex_jong = ['ㄳ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ'];

const Hangul = () => {
  const [data, setData] = useState([]);
  const [str, setStr] = useState('');
  const [han, setHan] = useState('');
  function handleStr(e) {
    setStr(e.target.value);
  }
  function makeStr() {
    let cho, jung, jong;
    let sTest = str;
    console.log('sTest', sTest, sTest.split(''));
    // sTest.split('').reduce((acc,cur){
    //     acc.push(cur)
    // },[])
    const hangulTrans = sTest.split('').map((item) => {
      const nTmp = item.charCodeAt(0) - 0xac00;
      console.log('nTmp ', nTmp);
      console.log('종성 테스트 ', 0x11a7 + cJong.indexOf('ㅅ'));
      jong = nTmp % 28; // 종성
      jung = ((nTmp - jong) / 28) % 21; // 중성
      cho = ((nTmp - jong) / 28 - jung) / 21; // 종성
      return {
        jong: jong,
        jung: jung,
        cho: cho,
      };
    });
    setData(hangulTrans);
  }
  useEffect(() => {
    console.log('data ', data);
    if (data && data.length !== 0) {
      renderHan();
    }
  }, [data]);

  function renderHan() {
    let temp = [];
    let all = [];
    let finalStr = '';
    let useCho = false;
    for (let i = 0; i < data.length; i++) {
      const { cho, jung, jong } = data[i];
      all.push(cho); //test
      all.push(jung); //test
      all.push(jong); // test
      console.log(String.fromCharCode(0x1100 + cho)); // 초성은 이렇게
      console.log(String.fromCharCode(0xac00 + (cho * 21 + jung) * 28)); // 초성 + 중성
      console.log(String.fromCharCode(0xac00 + (cho * 21 + jung) * 28 + jong)); // 초성 + 중성 + 종
      let first = String.fromCharCode(0x1100 + cho);
      let second = String.fromCharCode(0xac00 + (cho * 21 + jung) * 28);
      if (useCho) {
        temp.push(second);
        useCho = false;
      } else {
        temp.push(first);
        temp.push(second);
      }

      // 종성이 0인경우 다음 초성을 붙혀봄
      if (jong == 0 && i + 1 < data.length) {
        //해당 초성이 종성 몇번째인지 알면댐
        console.log('jong is zero ');
        //초성을 조성으로 바꿔야할경우 매핑 테이블 활용
        const nextCho = data[i + 1].cho;
        const mapping_jong = dict[rCho[nextCho]];
        let third = String.fromCharCode(
          0xac00 + (cho * 21 + jung) * 28 + mapping_jong,
        );
        useCho = true;
        temp.push(third);
      } else if (jong !== 0) {
        let third = String.fromCharCode(0xac00 + (cho * 21 + jung) * 28 + jong);
        temp.push(third);
      }
    }
    console.log(all);

    console.log(temp);
    console.log(finalStr);
  }
  return (
    <div style={{ padding: '5rem' }}>
      <Input value={str} onChange={handleStr}></Input>
      <button onClick={makeStr}>변환</button>
      <div>{han}</div>
    </div>
  );
};

export default Hangul;
