import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

function calPercentageValue(percent, value) {
  return parseInt((percent / 100) * value);
}
let timer = null;
const Money = () => {
  const [displayStr, setDisplayStr] = useState('일해라 노예야');
  const [presentTimeToSecond, setPresentTimeToSecond] = useState();
  const [sal, setSal] = useState(2000000);
  const [earnMoney, setEarnMoney] = useState(0);

  let startTime = '0930';
  let endTime = '1830';
  let startTimeHour = startTime.substr(0, 2);
  let startTimeMinute = startTime.substr(2);

  let endTimeHour = endTime.substr(0, 2);
  let endtTimeMinute = endTime.substr(2);
  let workDay = 20;
  let daySal = sal / workDay; //하루에 버는 돈

  let endTimeToSecond = endTimeHour * 3600 + endtTimeMinute * 60;
  let startTimeToSecond = startTimeHour * 3600 + startTimeMinute * 60;

  let totalDayWorkTimeToSecond = endTimeToSecond - startTimeToSecond;
  let earnMoneySecond = daySal / totalDayWorkTimeToSecond;

  console.log('earnMoneySecond', earnMoneySecond);
  //현재 번 돈 보여주기
  useEffect(() => {
    if (presentTimeToSecond <= endTimeToSecond) {
      let duringWorkTimeToSecond = presentTimeToSecond - startTimeToSecond;
      setEarnMoney(earnMoneySecond * duringWorkTimeToSecond);
    }
    return () => {};
  }, [
    presentTimeToSecond,
    earnMoneySecond,
    startTimeToSecond,
    endTimeToSecond
  ]);

  //tick
  useEffect(() => {
    function getTime() {
      let today = new Date();
      let hours = today.getHours(); // 시
      let minutes = today.getMinutes(); // 분
      let seconds = today.getSeconds(); // 초
      return hours * 3600 + minutes * 60 + seconds;
    }
    timer = setInterval(() => {
      let second = getTime();
      if (second === endTimeToSecond) {
        setDisplayStr('오늘 하루도 고생했습');
        clearInterval(timer);
      }
      setPresentTimeToSecond(second);
    }, 1000);
  }, []);

  const handleSal = (e) => {
    setSal(parseInt(e.target.value));
  };

  return (
    <div>
      <h1>{displayStr}</h1>
      {presentTimeToSecond}
      <Input
        placeholder="실급여를 입력하세요"
        onChange={handleSal}
        value={sal}
      />
      <div>
        <div>하루에 버는돈 = {daySal}</div>
        <div>일한시간 (초환산)= {totalDayWorkTimeToSecond}</div>
        <div>님이 초당 버는돈 {earnMoneySecond}</div>
        <div>님이 분당 버는돈 {earnMoneySecond * 60}</div>
        <div>님이 시간당 버는돈 {earnMoneySecond * 60 * 60}</div>
      </div>
      <div> 님이 현재 까지 번 돈 임 </div>₩<h1>{earnMoney}</h1>원
    </div>
  );
};

export default Money;
