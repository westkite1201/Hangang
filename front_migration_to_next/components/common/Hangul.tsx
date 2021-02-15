import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface IHangulProps {
  str: string;
  id: string;
  intervalTime: number;
}
const Hangul = ({ str, id, intervalTime }: IHangulProps) => {
  const [decompositionArray, setDecompositionArray] = useState([]);
  const [typingArray, setTypingArray] = useState([]);
  const typingTimer = useRef(null);
  const typingIndex = useRef(0);

  function makeDecompositionArray() {
    let cho, jung, jong;
    const sTest = str;
    //console.log('sTest', sTest, sTest.split(''));
    const hangulTrans = sTest.split('').map((item) => {
      const cCode = item.charCodeAt(0);
      if (cCode == 32) {
        return {
          isSpace: true
        };
      } // 한글이 아닌 경우
      if (cCode < 0xac00 || cCode > 0xd7a3) {
        return {
          other: item
        };
      }
      const nTmp = cCode - 0xac00;
      jong = nTmp % 28; // 종성
      jung = ((nTmp - jong) / 28) % 21; // 중성
      cho = ((nTmp - jong) / 28 - jung) / 21; // 초성
      return {
        jong: jong,
        jung: jung,
        cho: cho
      };
    });
    setDecompositionArray(hangulTrans);
  }

  useEffect(() => {
    if (str && id) {
      makeDecompositionArray();
    }
  }, [str, id]);

  useEffect(() => {
    if (decompositionArray && decompositionArray.length !== 0) {
      renderHan();
    }
  }, [decompositionArray]);

  useEffect(() => {
    if (typingArray && typingArray.length !== 0) {
      clearInterval(typingTimer.current);
      typingIndex.current = 0;
      typingTimer.current = setInterval(renderTyping, intervalTime);
    }
    return () => {
      clearInterval(typingTimer.current);
    };
  }, [typingArray]);

  function renderTyping() {
    if (document.getElementById(id)) {
      document.getElementById(id).innerHTML = typingArray[typingIndex.current];
      typingIndex.current += 1;
      if (typingArray.length === typingIndex.current) {
        clearInterval(typingTimer.current);
        typingIndex.current = 0;
      }
    }
  }

  function isRight(cho: number, jung: number, jong: number, isSpace, other) {
    if (isSpace || other) {
      return 1;
    }
    if (cho >= 0 && jung >= 0 && jong !== 0) {
      //3개다있음
      return 3;
    } else if (cho >= 0 && jung >= 0) {
      //초중만 이씅ㅁ
      return 2;
    } else {
      console.log('오타입니다 ');
      return 1;
    }
  }

  function renderHan() {
    const temp = [];
    const typingArray = [];
    let text = '';
    let cnt = 0;
    for (let i = 0; i < decompositionArray.length; i++) {
      const { cho, jung, jong, isSpace, other } = decompositionArray[i];
      //korean
      const first = String.fromCharCode(0x1100 + cho);
      const second = String.fromCharCode(0xac00 + cho * 588 + jung * 28);
      const third = String.fromCharCode(0xac00 + cho * 588 + jung * 28 + jong);
      //console.log(first, second, third);
      const complex = isRight(cho, jung, jong, isSpace, other);
      //console.log('complex ', complex);
      if (other) {
        temp.push(other);
      } else if (isSpace) {
        temp.push(' ');
      } else {
        temp.push(first);
        temp.push(second);
        if (complex === 3) {
          temp.push(third);
        }
      }
      for (let j = cnt; j < temp.length; j++) {
        typingArray.push(text + temp[j]);
      }
      cnt += complex;
      if (other) {
        text += other;
      } else if (isSpace) {
        text += ' ';
      } else if (complex === 2 || complex === 3) {
        text += third;
      }
    }
    //console.log(typingArray);
    setTypingArray(typingArray);
    // ('테스틋');
    // 'ㅌ', '테', '테ㅅ', '테스', '테스ㅌ', '테스트', '테스틋';
  }

  return (
    <St.Hangul>
      <span id={id}></span>
      <St.Cursor></St.Cursor>
    </St.Hangul>
  );
};
const St = {
  Hangul: styled.div`
    display: inline-block;
    span {
      padding-right: 2px;
    }
  `,
  Cursor: styled.span`
    border-right: 1px solid #000;
    animation: cursor 1s infinite;
    @keyframes cursor {
      0% {
        border-right: 1px solid #fff;
      }
      50% {
        border-right: 1px solid #000;
      }
      100% {
        border-right: 1px solid #fff;
      }
    }
  `
};
export default Hangul;
